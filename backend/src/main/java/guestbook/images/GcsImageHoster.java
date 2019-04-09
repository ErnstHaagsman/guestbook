package guestbook.images;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Component
@Profile("gcp")
@ConfigurationProperties(prefix = "guestbook.gcp")
public class GcsImageHoster implements ImageHoster {
    private String gcsBucket;
    private final Storage storage;

    public GcsImageHoster(){
        this.storage = StorageOptions.getDefaultInstance().getService();
    }

    @Override
    public String hostImage(BufferedImage image) throws IOException {
        String imageName = UUID.randomUUID().toString() + ".png";

        // Write png into a bytearray
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ImageIO.write(image, "png", byteArrayOutputStream);
        byteArrayOutputStream.flush();
        byte[] imageBytes = byteArrayOutputStream.toByteArray();
        byteArrayOutputStream.close();

        // Prepare the object to write into
        BlobId blobId = BlobId.of(gcsBucket, imageName);
        BlobInfo blobInfo = BlobInfo
                .newBuilder(blobId)
                .setContentType("image/png")
                .build();

        // Write bytes to GCS
        storage.create(blobInfo, imageBytes);

        // Return URL
        return getUrlPrefix() + "/" + imageName;
    }

    private String getUrlPrefix(){
        return "https://storage.googleapis.com/" + gcsBucket;
    }

    public void setGcsBucket(String gcsBucket) {
        this.gcsBucket = gcsBucket;
    }
}
