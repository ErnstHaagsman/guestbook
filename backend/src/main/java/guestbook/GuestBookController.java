package guestbook;

import guestbook.images.ImageDownloader;
import guestbook.images.ImageHoster;
import guestbook.images.ImageTransformer;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

@RestController("/entries")
public class GuestBookController {
    private final GuestBookRepository repository;
    private final ImageDownloader downloader;
    private final ImageTransformer transformer;
    private final ImageHoster hoster;

    public GuestBookController(GuestBookRepository repository,
                               ImageDownloader downloader,
                               ImageTransformer transformer,
                               ImageHoster hoster){
        this.repository = repository;
        this.downloader = downloader;
        this.transformer = transformer;
        this.hoster = hoster;
    }

    @GetMapping
    public EntryResponse lastTen(){
        return new EntryResponse(repository.lastTen());
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public EntryResponseModel postEntry(@RequestBody EntryRequestModel request){
        URL imageUrl;
        try {
             imageUrl = new URL(request.getImageUrl());
        }
        catch (MalformedURLException ex){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "The image URL you specified was invalid",
                    ex
            );
        }

        BufferedImage sourceImage;
        try {
            sourceImage = downloader.downloadImage(imageUrl);
        } catch (IOException ex) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Could not download image",
                    ex
            );
        }

        BufferedImage transformed = transformer.transform(sourceImage);

        String hostedImage;

        try {
            hostedImage = hoster.hostImage(transformed);
        } catch (IOException ex){
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Could not host image",
                    ex
            );
        }

        GuestBookEntry entry = repository.create(request.getAuthor(), request.getMessage(), hostedImage);
        return new EntryResponseModel(entry);
    }
}
