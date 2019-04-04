package guestbook;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController("/entries")
public class GuestBookController {
    private final GuestBookRepository repository;

    public GuestBookController(GuestBookRepository repository){
        this.repository = repository;
    }

    @GetMapping
    public EntryResponse lastTen(){
        return new EntryResponse(repository.lastTen());
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public GuestBookEntry postEntry(@RequestBody EntryRequestModel request){
        return repository.create(request.getAuthor(), request.getMessage(), request.getImageUrl());
    }
}
