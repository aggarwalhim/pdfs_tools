var EL=[["H","Hydrogen",1.008],["He","Helium",4.0026],["Li","Lithium",6.94],["Be","Beryllium",9.0122],["B","Boron",10.81],["C","Carbon",12.011],["N","Nitrogen",14.007],["O","Oxygen",15.999],["F","Fluorine",18.998],["Ne","Neon",20.180],["Na","Sodium",22.990],["Mg","Magnesium",24.305],["Al","Aluminium",26.982],["Si","Silicon",28.085],["P","Phosphorus",30.974],["S","Sulfur",32.06],["Cl","Chlorine",35.45],["Ar","Argon",39.948],["K","Potassium",39.098],["Ca","Calcium",40.078],["Sc","Scandium",44.956],["Ti","Titanium",47.867],["V","Vanadium",50.942],["Cr","Chromium",51.996],["Mn","Manganese",54.938],["Fe","Iron",55.845],["Co","Cobalt",58.933],["Ni","Nickel",58.693],["Cu","Copper",63.546],["Zn","Zinc",65.38],["Ga","Gallium",69.723],["Ge","Germanium",72.630],["As","Arsenic",74.922],["Se","Selenium",78.971],["Br","Bromine",79.904],["Kr","Krypton",83.798],["Rb","Rubidium",85.468],["Sr","Strontium",87.62],["Y","Yttrium",88.906],["Zr","Zirconium",91.224],["Nb","Niobium",92.906],["Mo","Molybdenum",95.95],["Tc","Technetium",98,1],["Ru","Ruthenium",101.07],["Rh","Rhodium",102.91],["Pd","Palladium",106.42],["Ag","Silver",107.87],["Cd","Cadmium",112.41],["In","Indium",114.82],["Sn","Tin",118.71],["Sb","Antimony",121.76],["Te","Tellurium",127.60],["I","Iodine",126.90],["Xe","Xenon",131.29],["Cs","Caesium",132.91],["Ba","Barium",137.33],["La","Lanthanum",138.91],["Ce","Cerium",140.12],["Pr","Praseodymium",140.91],["Nd","Neodymium",144.24],["Pm","Promethium",145,1],["Sm","Samarium",150.36],["Eu","Europium",151.96],["Gd","Gadolinium",157.25],["Tb","Terbium",158.93],["Dy","Dysprosium",162.50],["Ho","Holmium",164.93],["Er","Erbium",167.26],["Tm","Thulium",168.93],["Yb","Ytterbium",173.05],["Lu","Lutetium",174.97],["Hf","Hafnium",178.49],["Ta","Tantalum",180.95],["W","Tungsten",183.84],["Re","Rhenium",186.21],["Os","Osmium",190.23],["Ir","Iridium",192.22],["Pt","Platinum",195.08],["Au","Gold",196.97],["Hg","Mercury",200.59],["Tl","Thallium",204.38],["Pb","Lead",207.2],["Bi","Bismuth",208.98],["Po","Polonium",209,1],["At","Astatine",210,1],["Rn","Radon",222,1],["Fr","Francium",223,1],["Ra","Radium",226,1],["Ac","Actinium",227,1],["Th","Thorium",232.04],["Pa","Protactinium",231.04],["U","Uranium",238.03],["Np","Neptunium",237,1],["Pu","Plutonium",244,1],["Am","Americium",243,1],["Cm","Curium",247,1],["Bk","Berkelium",247,1],["Cf","Californium",251,1],["Es","Einsteinium",252,1],["Fm","Fermium",257,1],["Md","Mendelevium",258,1],["No","Nobelium",259,1],["Lr","Lawrencium",266,1],["Rf","Rutherfordium",267,1],["Db","Dubnium",268,1],["Sg","Seaborgium",269,1],["Bh","Bohrium",270,1],["Hs","Hassium",277,1],["Mt","Meitnerium",278,1],["Ds","Darmstadtium",281,1],["Rg","Roentgenium",282,1],["Cn","Copernicium",285,1],["Nh","Nihonium",286,1],["Fl","Flerovium",289,1],["Mc","Moscovium",290,1],["Lv","Livermorium",293,1],["Ts","Tennessine",294,1],["Og","Oganesson",294,1]];

var BYSYM={};EL.forEach(function(e,i){BYSYM[e[0]]={z:i+1,name:e[1],mass:e[2],approx:!!e[3]};});
function parseFormula(str){
  str=String(str).replace(/\s+/g,'').replace(/[\[{]/g,'(').replace(/[\]}]/g,')');
  if(!str)return {error:'Type a formula.'};
  var parts=str.split(/[·•*.]/),total={},p,k;
  for(p=0;p<parts.length;p++){
    var part=parts[p];if(!part)continue;
    var m=part.match(/^(\d+)(.*)$/),mult=1,body=part;
    if(m){mult=parseInt(m[1],10);body=m[2];}
    var stack=[{}],i=0;
    while(i<body.length){
      var c=body[i],num;
      if(c==='('){stack.push({});i++;}
      else if(c===')'){
        i++;num='';while(i<body.length&&/\d/.test(body[i]))num+=body[i++];
        var n=num?parseInt(num,10):1,top=stack.pop();
        if(!stack.length)return {error:'Brackets do not match.'};
        for(k in top)stack[stack.length-1][k]=(stack[stack.length-1][k]||0)+top[k]*n;
      }else if(/[A-Z]/.test(c)){
        var sym=c;i++;if(i<body.length&&/[a-z]/.test(body[i])){sym+=body[i];i++;}
        num='';while(i<body.length&&/\d/.test(body[i]))num+=body[i++];
        if(!BYSYM[sym])return {error:'Unknown element: '+sym+'. Use capital then small letters, like Na or Cl.'};
        var top2=stack[stack.length-1];top2[sym]=(top2[sym]||0)+(num?parseInt(num,10):1);
      }else return {error:'Unexpected character: '+c};
    }
    if(stack.length!==1)return {error:'Brackets do not match.'};
    for(k in stack[0])total[k]=(total[k]||0)+stack[0][k]*mult;
  }
  if(!Object.keys(total).length)return {error:'Type a formula.'};
  return {counts:total};
}
function molWeight(f){var r=parseFormula(f);if(r.error)return r;var w=0;for(var k in r.counts)w+=BYSYM[k].mass*r.counts[k];r.mw=w;return r;}
