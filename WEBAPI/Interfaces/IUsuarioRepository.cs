using System.Collections.Generic;

namespace WEBAPI.Models
{
    public interface IEventoRepository
    {
         public Usuario incluir(Usuario obj);
         public Usuario alterar(Usuario obj);
         public bool excluir(int userID);
         public IEnumerable<Usuario> listar();
         public Usuario obter(int userID);
    }
}