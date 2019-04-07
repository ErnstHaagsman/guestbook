package guestbook.images;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.awt.image.BufferedImage;

import static java.lang.Math.round;

@Primary
@Component
@ConfigurationProperties(prefix="guestbook.images")
public class ScaleTransformer implements ImageTransformer {
    private int width = 700;

    @Override
    public BufferedImage transform(BufferedImage source) {
        float oldHeight = source.getHeight();
        float oldWidth = source.getWidth();

        int height = round((float)this.width * (oldHeight / oldWidth));


        Image tmp = source.getScaledInstance(this.width, height, Image.SCALE_SMOOTH);
        BufferedImage scaledImage = new BufferedImage(this.width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D graphics = scaledImage.createGraphics();
        graphics.drawImage(tmp, 0, 0, null);
        graphics.dispose();

        return scaledImage;
    }

    public void setWidth(int width) {
        this.width = width;
    }
}
