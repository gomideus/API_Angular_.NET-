using System.Collections.Generic;

namespace WEBAPI.Models
{
    public interface IEventoRepository
    {
         public Usuario Incluir(Usuario obj);
         public Usuario Alterar(Usuario obj);
         public bool Excluir(int userID);
         public IEnumerable<Usuario> Listar();
         public Usuario Obter(int userID);
    }
}