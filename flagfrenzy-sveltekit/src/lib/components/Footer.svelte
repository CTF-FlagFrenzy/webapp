<footer>
	<div class="footer-column">
	  <h3>About Us</h3>
	  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor magna in enim.</p>
	</div>
	
	<div class="footer-column">
	  <h3>Quick Links</h3>
	  <ul>
		<li><a href="/">Home</a></li>
		<li><a href="/admin">Admin</a></li>
		<li><a href="/contact">Contact</a></li>
	  </ul>
	</div>
	
	<div class="footer-column">
	  <h3>Contact Us</h3>
	  <p>Email: info@example.com</p>
	  <p>Phone: (123) 456-7890</p>
	  <p>Address: 123 Main St, Anytown, USA</p>
	</div>
  </footer>
  
  <style>
	footer {
	  display: flex;
	  justify-content: space-around;
	  background: #40424B;
	  color: #ffffff;
	  text-align: center;
	  padding: 2em 1em 1em 1em;
	  font-weight: normal;
	  flex-wrap: wrap;
	  margin-top: 1em;
	}
  
	.footer-column {
	  flex: 1;
	  padding: 0 20px;
	  min-width: 250px; /* Mindestbreite für jede Spalte */
	  margin-bottom: 1em;
	}
  
	.footer-column h3 {
	  font-size: 20px;
	  margin-bottom: 15px;
	  font-weight: 600;
	  color: #F3CC59;
	}
  
	.footer-column p,
	.footer-column a {
	  font-size: 16px;
	  text-decoration: none;
	  margin: 0;
	}
  
	a:hover {
	  color: #FF9900;
	}
  
	.footer-column ul {
	  list-style: none;
	  padding: 0;
	  margin: 0 0 5% 0;
	}
  
	.footer-column li {
	  margin: 0;
	  padding: 0;
	}
  
	/* Media Query für kleinere Bildschirme */
	@media (max-width: 768px) {
	  footer {
		flex-direction: column;
		text-align: left;
		padding: 2em 1em 1em 1em;
		margin-top: 1em;
	  }
  
	  .footer-column {
		max-width: 100%;
	  }
  
	  .footer-column h3,
	  .footer-column p,
	  .footer-column a {
		font-size: 18px;
	  }
	}
  
	/* Extra kleine Bildschirme (z. B. Handys) */
	@media (max-width: 480px) {
	footer {
		margin-top: 1em;
		padding: 2em 1em 1em 1em;
	}
	  .footer-column h3 {
		font-size: 16px;
	  }
  
	  .footer-column p,
	  .footer-column a {
		font-size: 14px;
	  }
	}
  </style>
  