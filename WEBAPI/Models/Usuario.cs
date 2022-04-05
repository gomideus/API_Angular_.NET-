
using System;
using System.ComponentModel.DataAnnotations;
namespace WEBAPI.Models

{
    public class Usuario
    {
    [Key]
    public int userID { set; get; }

    public string name { set; get; }

    public string cpf { set; get; }

    public string email { set; get; }

    public string userType { set; get; }
    }
}