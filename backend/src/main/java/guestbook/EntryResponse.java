package guestbook;

import java.util.LinkedList;

public class EntryResponse {
    private final LinkedList<EntryResponseModel> messages;

    public EntryResponse(Iterable<GuestBookEntry> entries){
        this.messages = new LinkedList<>();

        for(GuestBookEntry entry : entries){
           messages.add(new EntryResponseModel(entry));
        }
    }

    public Iterable<EntryResponseModel> getMessages(){
        return messages;
    }
}
