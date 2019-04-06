package guestbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.OffsetDateTime;
import java.time.ZoneId;

@Repository
@Profile("postgres")
public class PostgresGuestBookRepository implements GuestBookRepository {
    private final JdbcTemplate jdbc;

    @Autowired
    public PostgresGuestBookRepository(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }

    @Override
    public GuestBookEntry create(String author, String message, String imageUrl) {
        OffsetDateTime now = OffsetDateTime.now(ZoneId.of("UTC"));
        jdbc.update("INSERT INTO entries (author, message, image_url, created_at) VALUES (?, ?, ?, ?);",
                author, message, imageUrl, now);
        return new GuestBookEntry(author, message, imageUrl, now);
    }

    @Override
    public Iterable<GuestBookEntry> lastTen() {
        return jdbc.query("SELECT * FROM entries ORDER BY created_at DESC LIMIT 10;",
                this::mapRowToEntry);
    }

    private GuestBookEntry mapRowToEntry(ResultSet rs, int rowNum)
    throws SQLException {
        OffsetDateTime createdAt = rs.getObject("created_at", OffsetDateTime.class);
        return new GuestBookEntry(
                rs.getString("author"),
                rs.getString("message"),
                rs.getString("image_url"),
                createdAt
        );
    }
}
