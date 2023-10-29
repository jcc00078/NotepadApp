using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotepadApp.Data;
using NotepadApp.Models.Entities;

namespace NotepadApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        private readonly NotesDbContext notesDbContext;

        public NotesController(NotesDbContext notesDbContext) {
            this.notesDbContext = notesDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllNotes()
        {
            return Ok(await notesDbContext.Notes.ToListAsync());
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetNoteById([FromRoute] Guid id)
        {
           var nota = await notesDbContext.Notes.FindAsync(id);
            if(nota == null)
            {
                return NotFound();
            }
            return Ok(nota);
        }


        [HttpPost]
        public async Task<IActionResult> createNote(Note nota)
        {
            nota.Id = Guid.NewGuid();
            await notesDbContext.Notes.AddAsync(nota);
            await notesDbContext.SaveChangesAsync();

            //Para que en Swagger nos salga la localizacion completa de la nota que acabamos de crear
            return CreatedAtAction(nameof(GetNoteById), new { id = nota.Id }, nota); //OJO, debe ser id obligatoriamente ya que el parametro que se recibe en GetNoteById se llama id
 
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateNote([FromRoute] Guid id, [FromBody] Note updatedNote)
        {
            var notaExistente = await notesDbContext.Notes.FindAsync(id);
            if (notaExistente == null)
            {
                return NotFound();
            }

            notaExistente.Title=updatedNote.Title;
            notaExistente.Description=updatedNote.Description;
            notaExistente.isVisible=updatedNote.isVisible;
            await notesDbContext.SaveChangesAsync();
            return Ok(notaExistente);
        }


        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteNote([FromRoute] Guid id)
        {
            var notaExistente = await notesDbContext.Notes.FindAsync(id);
            if (notaExistente == null)
            {
                return NotFound();
            }

            notesDbContext.Notes.Remove(notaExistente);
            await notesDbContext.SaveChangesAsync();
            return NoContent();
        }

    }
}
