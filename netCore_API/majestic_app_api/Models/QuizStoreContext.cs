using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using majestic_app_api.Models;
using MySql.Data.MySqlClient;

namespace majestic_API.Models
{
    public class QuizStoreContext
    {
        public string ConnectionString { get; set; }

        public QuizStoreContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<UserModel> GetAllUsers()
        {
            List<UserModel> list = new List<UserModel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from users", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new UserModel()
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            email = reader["email"].ToString(),
                            username = reader["username"].ToString(),
                            password = reader["password"].ToString(),
                            fullname = reader["fullname"].ToString()
                        });
                    }
                }
            }
            return list;
        }

        public List<UserModel> GetUserById(string emailid,string password)
        {
            List<UserModel> list = new List<UserModel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from users where email='"+ emailid+ "' and 	password='" + password + "'", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new UserModel()
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            email = reader["email"].ToString(),
                            username = reader["username"].ToString(),
                            password = reader["password"].ToString(),
                            fullname = reader["fullname"].ToString()
                        });
                    }
                }
            }
            return list;
        }


        public List<QuizModel> GetAllQuizList()
        {
            List<QuizModel> list = new List<QuizModel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from quizmaster", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new QuizModel()
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            question = reader["question"].ToString(),
                            answer1 = reader["answer1"].ToString(),
                            answer2 = reader["answer2"].ToString(),
                            answer3 = reader["answer3"].ToString(),
                             answer4 = reader["answer4"].ToString()
                        });
                    }
                }
            }
            return list;
        }

        public List<QuizModel> GetByIdQuizList(int id)
        {
            List<QuizModel> list = new List<QuizModel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from quizmaster where id="+id, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new QuizModel()
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            question = reader["question"].ToString(),
                            answer1 = reader["answer1"].ToString(),
                            answer2 = reader["answer2"].ToString(),
                            answer3 = reader["answer3"].ToString(),
                            answer4 = reader["answer4"].ToString()
                        });
                    }
                }
            }
            return list;
        }

        public int DeleteByIdQuizList(int id)
        {
            int resultdata=0;
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("delete from quizmaster where id=" + id, conn);
                resultdata=cmd.ExecuteNonQuery();
            }
            return resultdata;
        }

        public int UpdateByIdQuizList(int id,QuizModel quizModel)
        {
            int resultdata = 0;
            using (MySqlConnection conn = GetConnection())
            {
                MySqlCommand cmd = new MySqlCommand("UPDATE quizmaster SET question=@question, answer1=@answer1, answer2=@answer2, answer3=@answer3, answer4=@answer4 WHERE id =@id", conn);
                conn.Open();
                cmd.Parameters.AddWithValue("@question", quizModel.question);
                cmd.Parameters.AddWithValue("@answer1", quizModel.answer1);
                cmd.Parameters.AddWithValue("@answer2", quizModel.answer2);
                cmd.Parameters.AddWithValue("@answer3", quizModel.answer3);
                cmd.Parameters.AddWithValue("@answer4", quizModel.answer4);
                cmd.Parameters.AddWithValue("@id", id);
                resultdata = cmd.ExecuteNonQuery();
            }
            return resultdata;
        }

        public int InsertQuizList(QuizModel quizModel)
        {
            int resultdata = 0;
            using (MySqlConnection conn = GetConnection())
            {
                MySqlCommand cmd = new MySqlCommand("insert into quizmaster(question,answer1,answer2,answer3,answer4) values (@question,@answer1,@answer2,@answer3,@answer4)", conn);
                conn.Open();
                cmd.Parameters.AddWithValue("@question", quizModel.question);
                cmd.Parameters.AddWithValue("@answer1", quizModel.answer1);
                cmd.Parameters.AddWithValue("@answer2", quizModel.answer2);
                cmd.Parameters.AddWithValue("@answer3", quizModel.answer3);
                cmd.Parameters.AddWithValue("@answer4", quizModel.answer4);
                resultdata = cmd.ExecuteNonQuery();
            }
            return resultdata;
        }
    }
}
