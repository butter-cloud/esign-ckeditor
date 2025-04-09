const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db')

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// API
app.post('/save', async (req, res) => {
  const { title, html } = req.body;
  console.log('받은 문서 제목:', title);
  console.log('받은 HTML preview:', html.slice(0, 200) + '...');

  try {
    await pool.query(
      'INSERT INTO temp_documents (title, content) VALUES ($1, $2)',
      [title, html]
    );
    res.status(200).json({ message: `문서 저장 완료 - title: ${title}` });
  } catch (err) {
    console.error('DB 저장 오류:', err);
    res.status(500).json({ message: '문서 저장 실패', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ 서버가 포트 ${PORT}에서 실행 중`);
});
