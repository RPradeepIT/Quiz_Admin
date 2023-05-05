using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace majestic_app_api.Models
{
    public class QuizModel
    {
        public int id { get; set; }

        public string question { get; set; }

        public string answer1 { get; set; }

        public string answer2 { get; set; }

        public string answer3 { get; set; }
        public string answer4 { get; set; }

    }
}
