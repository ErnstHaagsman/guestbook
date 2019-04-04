package guestbook;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;

@Component
@Scope("singleton")
public class MemoryGuestBookRepository implements GuestBookRepository {
    private final Deque<GuestBookEntry> entries;
    private final int CAPACITY = 10;

    public MemoryGuestBookRepository(){
        entries = new ArrayDeque<>(CAPACITY);
    }

    @Override
    public GuestBookEntry create(String author, String message, String imageUrl) {
        GuestBookEntry newEntry = new GuestBookEntry(author, message, imageUrl, LocalDateTime.now());
        if (entries.size() == CAPACITY)
            entries.removeLast();

        entries.addFirst(newEntry);
        return newEntry;
    }

    @Override
    public Iterable<GuestBookEntry> lastTen() {
        return new LinkedList<>(entries);
    }
}
