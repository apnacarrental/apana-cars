import { sanitizeHtml } from '../lib/sanitize';

const safe = `
  <h1>Hello</h1>
  <p>This is a <strong>safe</strong> paragraph.</p>
  <ul><li>Item 1</li></ul>
  <a href="https://example.com" target="_blank">Link</a>
  <img src="/images/local.jpg" alt="Local Image" />
  <img src="https://res.cloudinary.com/demo/image/upload/sample.jpg" alt="Cloudinary" />
`;

const unsafe = `
  <h1>Malicious</h1>
  <script>alert(1)</script>
  <a href="javascript:alert('xss')">Click me</a>
  <img src="x" onerror="alert(1)" />
  <iframe src="http://evil.com"></iframe>
  <div style="background-image: url(javascript:alert(1))">Test</div>
  <form action="http://evil.com"><input type="submit" /></form>
`;

console.log("=== SAFE CONTENT ===");
console.log(sanitizeHtml(safe));

console.log("\n=== UNSAFE CONTENT ===");
console.log(sanitizeHtml(unsafe));
