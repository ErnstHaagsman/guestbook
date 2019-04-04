package guestbook;

public interface GuestBookRepository {
    GuestBookEntry create(String author, String message, String imageUrl);
    Iterable<GuestBookEntry> lastTen();
}
