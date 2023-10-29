using Microsoft.EntityFrameworkCore;
using NotepadApp.Models.Entities;

namespace NotepadApp.Data
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Note> Notes { get; set; }
    }
}
