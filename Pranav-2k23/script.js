// Preloader

function hideLoader(){
  const loader = document.querySelector('#loader');
  setTimeout(function(){
    loader.style.opacity = 0;
  },4500)
}

hideLoader();

const days=document.querySelector("#days");
const hours=document.querySelector("#hours");
const minutes=document.querySelector("#minutes");
const seconds=document.querySelector("#seconds");

function updateTime(){
const currentYear=new Date().getFullYear();
//finding new year date
const newYear = new Date(`March 23 ${currentYear} 00:00:00`);
//finding current date
const currentDate = new Date();
//finding difference between newyear and current date
const diff = newYear - currentDate;
//Math.floor() function is used to take integer as whole number and ignore the fraction number
const d = Math.floor(diff/1000/60/60/24);
const h = Math.floor((diff/1000/60/60)%24);
const m = Math.floor((diff/1000/60)%60);
const s = Math.floor((diff/1000)%60);

days.innerHTML=d<10?"0"+d:d;
hours.innerHTML=h<10?"0"+h:h;
minutes.innerHTML=m<10?"0"+m:m;
seconds.innerHTML=s<10?"0"+s:s;

}

setInterval(updateTime,1000);

// Javascript for event count

(function ($) {
     $.fn.countTo = function (options) {
         options = options || {};
         
         return $(this).each(function () {
             // set options for current element
             var settings = $.extend({}, $.fn.countTo.defaults, {
                 from:            $(this).data('from'),
                 to:              $(this).data('to'),
                 speed:           $(this).data('speed'),
                 refreshInterval: $(this).data('refresh-interval'),
                 decimals:        $(this).data('decimals')
             }, options);
             
             // how many times to update the value, and how much to increment the value on each update
             var loops = Math.ceil(settings.speed / settings.refreshInterval),
                 increment = (settings.to - settings.from) / loops;
             
             // references & variables that will change with each update
             var self = this,
                 $self = $(this),
                 loopCount = 0,
                 value = settings.from,
                 data = $self.data('countTo') || {};
             
             $self.data('countTo', data);
             
             // if an existing interval can be found, clear it first
             if (data.interval) {
                 clearInterval(data.interval);
             }
             data.interval = setInterval(updateTimer, settings.refreshInterval);
             
             // initialize the element with the starting value
             render(value);
             
             function updateTimer() {
                 value += increment;
                 loopCount++;
                 
                 render(value);
                 
                 if (typeof(settings.onUpdate) == 'function') {
                     settings.onUpdate.call(self, value);
                 }
                 
                 if (loopCount >= loops) {
                     // remove the interval
                     $self.removeData('countTo');
                     clearInterval(data.interval);
                     value = settings.to;
                     
                     if (typeof(settings.onComplete) == 'function') {
                         settings.onComplete.call(self, value);
                     }
                 }
             }
             
             function render(value) {
                 var formattedValue = settings.formatter.call(self, value, settings);
                 $self.html(formattedValue);
             }
         });
     };
     
     $.fn.countTo.defaults = {
         from: 0,               // the number the element should start at
         to: 0,                 // the number the element should end at
         speed: 1000,           // how long it should take to count between the target numbers
         refreshInterval: 100,  // how often the element should be updated
         decimals: 0,           // the number of decimal places to show
         formatter: formatter,  // handler for formatting the value before rendering
         onUpdate: null,        // callback method for every time the element is updated
         onComplete: null       // callback method for when the element finishes updating
     };
     
     function formatter(value, settings) {
         return value.toFixed(settings.decimals);
     }
 }(jQuery));
 
 jQuery(function ($) {
   // custom formatting example
   $('.count-number').data('countToOptions', {
     formatter: function (value, options) {
       return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
     }
   });
   
   // start all the timers
   $('.timer').each(count);  
   
   function count(options) {
     var $this = $(this);
     options = $.extend({}, options || {}, $this.data('countToOptions') || {});
     $this.countTo(options);
   }
 })




// card animation  

let holder = document.querySelectorAll('.cards-container')[0],
    cards = document.querySelectorAll('.cards');
let preActiveCard = cards[1];
let nextActiveCard = cards[2];
function scrollleft() {
  holder.classList.remove('next');
  holder.classList.remove('reset');
  holder.classList.add('next');
  
  preActiveCard.classList.remove('actives');
  nextActiveCard.classList.add('actives');
  setTimeout(reset, 600);
}
function reset() {
  holder.classList.remove('next');
  holder.classList.add('reset');
  preActiveCard.classList.add('actives');
  nextActiveCard.classList.remove('actives');
}
setInterval(scrollleft, 1500);

/*--------------------
Vars
--------------------*/
let progress = 5;
let nprogress = 5;
let startX = 0;
let nstartX = 0;
let active = 0;
let nactive = 0;
let isDown = false;

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02;
const nspeedWheel = 0.02;
const speedDrag = -0.1;
const nspeedDrag = -0.1;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );
const getZnindex = (narray, nindex) =>
  narray.map(
    (_, ni) =>
      nindex === ni ? narray.length : narray.length - Math.abs(nindex - ni) //added i as ni
  );

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll(".tcarousel-item-event");
const $nitems = document.querySelectorAll(".ncarousel-item-event");
const $cursors = document.querySelectorAll(".cursor");

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);
};

// for items non technical

const ndisplayItems = (nitem, nindex, nactive) => {
  const znIndex = getZnindex([...$nitems], nactive)[nindex];
  nitem.style.setProperty("--znIndex", znIndex);
  nitem.style.setProperty("--nactive", (nindex - nactive) / $nitems.length); //done
};
/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

// for animate non technical

const nanimate = () => {
  nprogress = Math.max(0, Math.min(nprogress, 100));
  nactive = Math.floor((nprogress / 100) * ($nitems.length - 1));

  $nitems.forEach((nitem, nindex) => ndisplayItems(nitem, nindex, nactive));
};
nanimate();

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

// for Click on items on non technical
$nitems.forEach((nitem, ni) => {
  nitem.addEventListener("click", () => {
    nprogress = (ni / $nitems.length) * 100 + 10;
    nanimate();
  });
});

/*--------------------
Handlers
--------------------*/
const handleWheel = (e) => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
};

// for handlers on non technical
const nhandleWheel = (e) => {
  const nwheelProgress = e.deltaY * nspeedWheel;
  nprogress = nprogress + nwheelProgress;
  nanimate();
};

const handleMouseMove = (e) => {
  if (e.type === "mousemove") {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};

// non technical handlemousemove

const nhandleMouseMove = (e) => {
  if (e.type === "mousemove") {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const nx = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const nmouseProgress = (nx - nstartX) * nspeedDrag;
  nprogress = nprogress + nmouseProgress;
  nstartX = nx;
  nanimate();
};

const handleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

// non technical for handlemousedown
const nhandleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

//non teechnial event for handlemouseup

const nhandleMouseUp = () => {
  isDown = false;
};
/*--------------------
Listeners
--------------------*/

// technical event command for listeners
document.addEventListener("mousewheel", handleWheel);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("touchstart", handleMouseDown);
document.addEventListener("touchmove", handleMouseMove);
document.addEventListener("touchend", handleMouseUp);

// non techncial event command for listeners
document.addEventListener("mousewheel", nhandleWheel);
document.addEventListener("mousedown", nhandleMouseDown);
document.addEventListener("mousemove", nhandleMouseMove);
document.addEventListener("mouseup", nhandleMouseUp);
document.addEventListener("touchstart", nhandleMouseDown); //
document.addEventListener("touchmove", nhandleMouseMove); //
document.addEventListener("touchend", nhandleMouseUp); //
