/*-----------------------------------------------------------------------------
  REQUIRE
-----------------------------------------------------------------------------*/
var yo      = require('yo-yo')
var csjs    = require('csjs-inject')
var minixhr = require('minixhr')

/*-----------------------------------------------------------------------------
  THEME
-----------------------------------------------------------------------------*/
var FONT        = 'Josefin Slab, cursive'
var BLACK       = 'hsla(0,0%,0%,1)'
var WHITE       = 'hsla(0,0%,100%,1)'
var DARKBLUE    = 'hsla(236,60%,43%,1)'
var BLUE        = 'hsla(190,96%,71%,1)'
var LIGHTBLUE   = 'hsla(188,100%,83%,1)'
var YELLOW      = 'hsla(42,100%,70%,1)'
var LIGHTYELLOW = 'hsla(56,100%,67%,1)'
var VIOLET      = 'hsla(309,40%,78%,1)'
var LIGHTVIOLET = 'hsla(260,33%,70%,1)'
var GREY        = 'hsla(29,3%,50%,1)'
var BABYVIOLET  = 'hsla(335,40%,83%,1)'
var MARINEBLUE  = 'hsla(236,100%,68%,1)'
var COLORS      = [YELLOW, LIGHTYELLOW, VIOLET, LIGHTVIOLET]

/*-----------------------------------------------------------------------------
  LOADING FONT
-----------------------------------------------------------------------------*/
var links = [
  'https://fonts.googleapis.com/css?family=Josefin Slab',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
            ]
var font = yo`<link href= ${links[0]} rel='stylesheet' type='text/css'>`
var fontAwesome = yo`<link href=${links[1]} rel='stylesheet' type='text/css'>`

document.head.appendChild(font)
document.head.appendChild(fontAwesome)

/*-----------------------------------------------------------------------------
  LOADING DATA
-----------------------------------------------------------------------------*/
minixhr('https://api.github.com/users/jeca78', startPage)
 function startPage (data) {
     var data = JSON.parse(data)
document.body.appendChild(template(data))
activateScrollEffect(COLORS)
 }

/*-----------------------------------------------------------------------------
  WEB PAGE
-----------------------------------------------------------------------------*/
var css = csjs`
  body {
    text-align      : center;
    background-color: ${BLUE};
    color           : ${BLACK};
    font-family     : ${FONT}
  }
  h1 {
    margin-top      : 1em;
    color           : ${MARINEBLUE};
    font-size       : 4em;
    font-weight     : bold;
    text-transform  : capitalize;
  }
  h3 {
    color           : ${DARKBLUE};
    font-size       : 3em;
    margin-bottom   : 3em;
  }
  img {
    margin-top      : 10em;
    border          : 5px solid ${WHITE};
    border-radius   : 50%;
    width           : 20em;
  }
  @-webkit-keyframes bounce {
      0% {
        bottom: 50px;
      }
      70% {
        bottom: 100px;
        color: ${DARKBLUE};
      }
      100% {
        bottom: 50px;
      }
  }
  .arrow{
    position        : relative;
    font-size       : 3em;
    color           : ${GREY};
    animation       : bounce 2s infinite;
  }
`

function template (data) {
  return yo`
    <div>
    <img src="${data.avatar_url}">
     <h1>${data.name}</h1>
     <h3>${data.bio}</h3>
     <div>
         <i class="${css.arrow} fa fa-chevron-down" aria-hidden="true"></i>
     </div>
      ${portfolioComponent()}
	    ${footerComponent()}
    </div>
  `
}


/*--------------------------------------------------------------------------------
  PORTFOLIO COMPONENT
--------------------------------------------------------------------------------*/
 function portfolioComponent () {
      var css = csjs`
  	.portfolio {
      margin               : 2em 0 2em 0;
      width                : 100%;
    }
    .portfolioItem {
       width               : 100%;
       padding-bottom      : 200px;
       background-color    : ${YELLOW};
       color               : ${VIOLET};
       display             : flex;
       flex-direction      : column;
       align-items         : flex-start;
       transition          : 10s;
    }
    .portfolioItem_isHover {
      width                : 100%;
      padding-bottom       : 200px;
      background-color     : ${LIGHTBLUE};
      color                : ${DARKBLUE};
      display              : flex;
      flex-direction       : column;
      align-items          : flex-start;
      cursor               : pointer;
      transition           : 2s;
    }
    .portfolioTitle {
      margin               : 2em;
      padding		           : 0.5em;
      font-size		         : 3em;
      color		             : ${DARKBLUE};
      background-color     : ${LIGHTBLUE};
      border-radius        : 4px;
      border               : 4px solid ${DARKBLUE};
      transition	         : 2s;
    }
    .portfolioTitle_isHover {
      margin               : 2em 2em 2em 1.5em;
      padding              : 0.5em;
      font-size            : 3em;
      color                : ${GREY};
      background-color     : ${BABYVIOLET};
      border-radius        : 4px;
      border               : 4px solid ${GREY};
      transition           : 2s;
    }
    .portfolioBody {
      margin		           : 0 40% 0 0em;
      text-align 	         : left;
      font-size		         : 1.2em;
      color		             : ${BLACK};
      transition	         : 2s;
    }
     .portfolioBody_isHover {
      margin               : 0 35% 0 4em;
      text-align           : left;
      font-size            : 1.2em;
      color                : ${BLACK};
      transition           : 2s;
    }
  `
  function template () {
    return yo`
    <div onmouseover=${hoverPortfolio} onclick=${openNewTab}>
      <div class="${css.portfolio}">
        <div class="${css.portfolioItem}">
          <div class="${css.portfolioTitle}">
            Portfolio: My quiz app
          </div>
          <div class="${css.portfolioBody}">
            My quiz is a quiz app where users can answer
            Likert scale questions and compare their answers
            with others. It stores all the data in the database
            and enables an admin view of all the answers.
           </div>
        </div>
      </div>
    </div>
    `
  }

  var element = template()
  return element

  function hoverPortfolio () {
    var element = this
    var newElement = yo`
      <div onmouseout=${unhoverPortfolio} onclick=${openNewTab}>
        <div class="${css.portfolio}">
          <div class="${css.portfolioItem_isHover}">
            <div class="${css.portfolioTitle_isHover}">
              Portfolio: My quiz app
            </div>
            <div class="${css.portfolioBody_isHover}">
              My quiz is a quiz app where users can answer
              Likert scale questions and compare their answers
              with others. It stores all the data in the database
              and enables an admin view of all the answers.
             </div>
          </div>
        </div>
      </div>
    `
    yo.update(element, newElement)
  }
  function unhoverPortfolio() {
    var element    = this
    var newElement = template()
    yo.update(element, newElement)
   }
   function openNewTab(){
    var url = "https://jeca78.github.io/quiz/"
    var win = window.open(url,'_blank');
    win.focus();
   }
}

/*--------------------------------------------------------------------------------
  FOOTER COMPONENT
--------------------------------------------------------------------------------*/
function footerComponent () {
	var css = csjs`
  	.container {
      display        : flex;
      justify-content: center;
    }
    .icon {
      padding: 1em;
      font-size      : 35px;
      color          : ${GREY};
    }
    .icon            :hover {
      opacity        : 0.4;
    }
    `

  function template () {
    return yo`
    <div class="${css.container}">
      <a href="https://github.com/jeca78">
        <i class="${css.icon} fa fa-github" aria-hidden="true"></i>
      </a>
      <a href="mailto:popovic.jeca@gmail.com ">
        <i class="${css.icon} fa fa-envelope-o" aria-hidden="true"></i>
      </a>
    </div>
    `
  }

  var element = template()
  return element
}

/*-----------------------------------------------------------------------------
  HELPERS
-----------------------------------------------------------------------------*/
function activateScrollEffect (COLORS) {
  var docHeight = document.body.offsetHeight
    //console.log("docHeight=" +docHeight);
  var colorAreaHeight = docHeight/COLORS.length
    //console.log("colorAreaHeight=" +colorAreaHeight);
  window.addEventListener("scroll", function(event) {
    var position = document.body.scrollTop
      //console.log("Position=" +position);
    var i = Math.floor(position/colorAreaHeight)
    var color = COLORS[i]
      //console.log("position/colorAreaHight=" +i);
    document.body.style.backgroundColor = color
    document.body.style.transition = "background-color 3s"
  })
}
