import postConfig from '../../config/postgres.js';

const { query } = postConfig;

const searchAuthor = (params) => params.rows[0].id_author;
const searchPost = (params) => params.rows[0].id_post;

export default {
  async index(req, res) {
    const results = await query('SELECT * FROM post;');

    res.json({ res: results.rows });
  },

  async unique(req, res) {
    const { url } = req.params;

    console.log(url);

    const post = await query(`SELECT * FROM post WHERE url = '${url}';`);

    const author = await query(
      `SELECT * FROM people WHERE id_people = ${searchAuthor(post)}`,
    );

    const dialogue = await query(
      `SELECT * FROM dialogue WHERE id_post = ${searchPost(post)}`,
    );

    const dialogueAuthor = await query(
      `SELECT * FROM people WHERE id_people = ${searchAuthor(dialogue)}`,
    );

    console.log(searchAuthor(post));

    res.json({
      post: post.rows,
      author: author.rows,
      comment: dialogue.rows,
      authorComment: dialogueAuthor.rows,
    });
  },

  async create(req, res) {
    const {
      title,
      body,
      urlParams,
    } = req.body;

    const { client: { idPeople } } = req;
    console.log(idPeople);

    const results = await query(
      `INSERT INTO post (
        title, body, url, id_author
      ) VALUES (
        $1, $2, $3, $4
      ) RETURNING *`,

      [
        title,
        body,
        urlParams,
        idPeople,
      ],
    );

    res.json({ res: results.rows });
  },

  async update(req, res) {
    const { url } = req.params;
    const {
      title,
      body,
      urlParams,
      author,
    } = req.body;

    const results = await query(
      `UPDATE post
      SET
      title = $1,
      body = $2,
      url = $3,
      id_author = $4
      WHERE url = '${url}' RETURNING *`,
      [title, body, urlParams, author],
    );

    res.json({ res: results });
  },

  async delete(req, res) {
    const { id } = req.params;

    await query(`DELETE FROM post WHERE id_post = ${id}`);

    res.json({ message: 'A postagem foi deletada' });
  },
};
