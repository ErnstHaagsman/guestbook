package guestbook.images;

import java.awt.image.BufferedImage;

public interface ImageTransformer {
    BufferedImage transform(BufferedImage source);
}
