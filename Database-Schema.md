# Postgres Database Schema

`users`

| column name       | data type | details                   |
|-------------------|-----------|---------------------------|
| `id`              | integer   | not null, primary key     |
| `email`           | string    | not null, indexed, unique |
| `password_digest` | string    | not null                  |
| `session_token`   | string    | not null, indexed, unique |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |


- index on `email`, `unique: true`
- index on `session_token`, `unique: true`

`auteur_flix`

| column name       | data type | details                                   |
|-------------------|-----------|-------------------------------------------|
| `id`              | integer   | not null, primary key                     |
| `title`           | string    | not null                                  |
| `director`        | string    | not null                                  |
| `description`     | text      | not null                                  |
| `year`            | integer   | not null                                  |
| `decade`          | integer   | not null                                  |

`profile`

| column name             | data type | details                                                   |
|-------------------------|-----------|-----------------------------------------------------------|
| `id`                    | integer   | not null, primary key                                     |
| `user_id`               | integer   | not null, indexed, foreign key                            |
| `profile_name`          | string    | not null                   |


`auteur_list`

| column name      | data type | details                        |
|------------------|-----------|--------------------------------|
| `id`             | integer   | not null, primary key          |
| `profile_id`     | integer   | not null, indexed, foreign key |
| `movie_id`       | integer   | not null, indexed, foreign key |
