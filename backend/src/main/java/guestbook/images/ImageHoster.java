package guestbook.images;

import java.awt.image.BufferedImage;
import java.io.IOException;

public interface ImageHoster {
    public String hostImage(BufferedImage image) throws IOException;
}
