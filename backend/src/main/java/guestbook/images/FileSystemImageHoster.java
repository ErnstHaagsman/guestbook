package guestbook.images;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
@Profile("!gcp")
public class FileSystemImageHoster implements ImageHoster {
    private final FileSystemHosterSettings settings;

    public FileSystemImageHoster(FileSystemHosterSettings settings){
        this.settings = settings;
    }

    @Override
    public String hostImage(BufferedImage image) throws IOException {
        String imageName = UUID.randomUUID().toString() + ".png";
        Path filePath = Paths.get(settings.getFilePath().toString(), imageName);
        File outputFile = filePath.toFile();
        ImageIO.write(image, "png", outputFile);
        return settings.getUrlPrefix() + "/" + imageName;
    }
}
