using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace majestic_API.Models
{
    public class UserModel
    {
        public int id { get; set; }

        public string email { get; set; }

        public string password { get; set; }

        public string username { get; set; }

        public string fullname { get; set; }
        public DateTime created_at { get; set; }
        public DateTime modified_at { get; set; }
    }
}
