package guestbook;

import com.fasterxml.jackson.annotation.JsonGetter;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public class EntryResponseModel {
    private final GuestBookEntry entry;

    public EntryResponseModel(GuestBookEntry entry){
        this.entry = entry;
    }

    public String getName(){
        return entry.getAuthor();
    }

    public String getMsg(){
        return entry.getMessage();
    }

    @JsonGetter(value="img_url")
    public String getImageUrl(){
        return entry.getImageUrl();
    }

    public ZonedDateTime getDatetime(){
        return entry.getCreatedAt().atZoneSameInstant(ZoneId.of("UTC"));
    }
}
