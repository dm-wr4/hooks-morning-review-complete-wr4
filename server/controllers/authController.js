const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const { title, password } = req.body;
        const db = req.app.get("db");
        
        let commander = await db.check_commander(title);
      
        if (commander[0]) {
            return res.status(400).send("Email already exists");
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        let newCommander = await db.promote_commander({title, hash});
        
        req.session.commander = newCommander[0];
        res.status(201).send(req.session.commander);
    },
    login: async (req, res) => {
        const { title, password } = req.body;
        const db = req.app.get("db");

        let commander = await db.check_commander(title);
        if (!commander[0]) {
            return res.status(400).send("Email not found");
        }
        let authenticated = bcrypt.compareSync(password, commander[0].password);
        if (!authenticated) {
            return res.status(401).send("Password is incorrect");
        }

        delete commander[0].password;
        req.session.commander = commander[0];
        res.status(202).send(req.session.commander);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getcommander: (req, res) => {
        if(req.session.commander){
            res.status(200).send(req.session.commander)
        } else {
            res.status(204).send("Please log in")
        }
    }
}