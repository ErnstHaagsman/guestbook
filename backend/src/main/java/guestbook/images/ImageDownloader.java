package guestbook.images;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;

public interface ImageDownloader {
    BufferedImage downloadImage(URL imageUrl) throws IOException;
}
