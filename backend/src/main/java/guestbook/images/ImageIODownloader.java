package guestbook.images;

import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;

@Component
public class ImageIODownloader implements ImageDownloader {
    @Override
    public BufferedImage downloadImage(URL imageUrl) throws IOException {
        return ImageIO.read(imageUrl);
    }
}
