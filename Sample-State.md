```
{
  entities: {
    auteur_flix: {
      1: {
        id: 1,
        director: "Federico Fellini",
        title: "La Dolce Vita",
        description: "A series of stories following a week in the life of a philandering tabloid journalist living in Rome.",
        year: 1960,
        decade: 1960
      },
      2: {
        id: 2,
        director: "Akira Kurosawa"
        title: "Seven Samurai",
        description: "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.",
        year:1954,
        decade: 1950
      },
    },
    users: {
      1: {
        id: 1,
        email: "moorecash@gmail.com",
        profilesIds: [1]       
      },
    },
    profiles: {
        1: {
           id: 1,
           user_id: 1,
           profile_name: "MifuneKinski"
        }
        2: {
           id: 2,
           user_id: 2,
           profile_name: "Dian"
        }
    },

    my_auteur_list: {
      1: {
        id: 1,
        profile_id: 1,
        auteur_flix_id: 2
      },
    },
  },
  ui: {
    loading: true/false,
    modal: true/false
  },
  errors: {
    login: ["Incorrect username/password combination"]
  },
  session: { currentUserId: 1 }
}
```
