using System.Collections.Generic;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace WEBAPI.Models
{
    [Authorize]
    [ApiController]
    [Route("api/usuarios")]
    public class EventoRepository : IEventoRepository
    {
        private readonly DatabaseContext _context;

        public EventoRepository( DatabaseContext ctx ){
            _context = ctx;
        }

        [HttpDelete("{userID}")]
        public bool excluir( int userID ){
            var obj = this.obter(userID);
            if(obj == null){
                return false;
            }
            _context.Remove(obj);
            _context.SaveChanges();
            return true;
        }

        [HttpPost]
        public Usuario incluir( Usuario user ){
            _context.Add(user);
            _context.SaveChanges();
            return user;
        }

        [HttpPut]
        public Usuario alterar( Usuario user ){
            var userDeletedObject = this.obter(user.userID);
            if(userDeletedObject == null){
                return null;
            }
            var uid = userDeletedObject.userID;
            user.userID = uid;
            _context.Remove(userDeletedObject);
            _context.Add(user);
            _context.SaveChanges();
            return null;
        }

        [HttpGet]
        public IEnumerable<Usuario> listar(){
            return _context.Eventos.ToList();
        }

        [HttpGet("{userID}")]
        public Usuario obter(int userID){
            return _context.Eventos.Where(a => a.userID == userID).FirstOrDefault();
        }

    }
}