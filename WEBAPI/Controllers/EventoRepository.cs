using System.Collections.Generic;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WEBAPI.Models
{
    [ApiController]
    [Route("api/EventoRepository")]
    public class EventoRepository : IEventoRepository
    {
        private readonly DatabaseContext _context;

        public EventoRepository( DatabaseContext ctx ){
            _context = ctx;
        }

        [HttpDelete("{userID}")]
        public bool Excluir( int userID ){
            var obj = this.Obter(userID);
            if(obj == null){
                return false;
            }
            _context.Remove(obj);
            _context.SaveChanges();
            return true;
        }

        [HttpPost]
        public Usuario Incluir( Usuario obj ){
            _context.Add(obj);
            _context.SaveChanges();
            return obj;
        }

        [HttpPut]
        public Usuario Alterar( Usuario obj ){
            var Dobj = this.Obter(obj.userID);
            if(Dobj == null){
                return null;
            }
            var uid = Dobj.userID;
            obj.userID = uid;
            _context.Remove(Dobj);
            _context.Add(obj);
            _context.SaveChanges();
            return null;
        }

        //[HttpGet]
        public IEnumerable<Usuario> Listar(){
            return _context.Eventos.ToList();
        }

        [HttpGet("{userID}")]
        public Usuario Obter(int userID){
            return _context.Eventos.Where(a => a.userID == userID).FirstOrDefault();
        }

    }
}