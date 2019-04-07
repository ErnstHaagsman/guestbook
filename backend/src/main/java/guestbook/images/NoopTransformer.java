package guestbook.images;

import org.springframework.stereotype.Component;

import java.awt.image.BufferedImage;

@Component
public class NoopTransformer implements ImageTransformer {
    @Override
    public BufferedImage transform(BufferedImage source) {
        return source;
    }
}
