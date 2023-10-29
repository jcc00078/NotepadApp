using Swashbuckle.AspNetCore.Annotations;

namespace NotepadApp.Models.Entities
{
    public class Note
    {
        [SwaggerSchema(ReadOnly = true)]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool isVisible { get; set; }
    }
}
