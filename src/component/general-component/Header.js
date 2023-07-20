

function Header({title}) {
    return (
        <div class="message-header">
        <img
          width="80"
          height="28"
          src="https://www.mitrais.com/wp-content/uploads/2019/11/Mitrais-Favicon.png"
        />
        <p>{title}</p>
        <button class="delete" aria-label="delete"></button>
      </div>
    )
} 

export default Header;