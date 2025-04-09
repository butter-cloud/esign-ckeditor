const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// API
app.post('/save', (req, res) => {
  const { title, html } = req.body;
  console.log('받은 문서 제목:', title);
  console.log('받은 HTML preview:', html.slice(0, 200) + '...');

  // TODO: DB 저장
  res.status(200).json({ message: `문서 저장 완료 - title: ${title}` });
});

app.listen(PORT, () => {
  console.log(`✅ 서버가 포트 ${PORT}에서 실행 중`);
});
