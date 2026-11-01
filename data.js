export const WORDS=[
 {id:'flash',word:'閃',sentence:'星星一閃一閃。',hint:'睇吓，光一時出現，一時唔見。',action:'點點星星，看看光怎樣變。'},
 {id:'shiny',word:'亮晶晶',sentence:'夜空的星星亮晶晶。',hint:'好多小星星，發出明亮嘅光。',action:'點點夜空，點亮小星星。'},
 {id:'star',word:'星星',sentence:'天上有一顆星星。',hint:'佢喺夜空入面，有尖尖嘅角。',action:'點點夜空，找出小星星。'},
 {id:'eyes',word:'眼睛',sentence:'我用眼睛看星星。',hint:'我哋用佢嚟睇嘢，有一對㗎。',action:'點點小眼睛，和它打招呼。'},
 {id:'sit',word:'坐',sentence:'小兔坐在椅子上。',hint:'小兔唔係企喺度，佢喺張凳上面。',action:'點點小兔，請它坐下休息。'},
 {id:'happy',word:'開開心心',sentence:'大家開開心心地玩。',hint:'小兔笑晒口，玩得好開心。',action:'點點小兔，和它一起玩。'}
];
export const LEVELS=[
 {name:'雲朵小跳台',tag:'拖一拖',subtitle:'輕輕一跳，向夜空出發',type:'drag',color:'#e5c08a',instruction:'把小星星拖到正確的答案雲。',short:'拖曳小星星',reward:'月光小星星',order:[2,3,4,0,1,5]},
 {name:'夜空飛行',tag:'飛一飛',subtitle:'快速升空，及時飛向答案雲',type:'fly',color:'#a7c9ca',instruction:'星星會快速自動升空，及時左右移動，撞中正確的答案雲。',short:'左右控制方向',reward:'彩色星光尾跡',order:[3,0,2,5,4,1]},
 {name:'月亮故事屋',tag:'點一點',subtitle:'聽聽故事，看看發生甚麼事',type:'story',color:'#d1b0d2',instruction:'先點一下畫面，再選相符的答案雲。',short:'探索小故事',reward:'月亮的微笑',order:[4,5,0,3,1,2]},
 {name:'星座尋路',tag:'畫一畫',subtitle:'畫出路線，點亮你的星座',type:'draw',color:'#b9bbec',instruction:'從小星星畫線到正確的答案雲。',short:'畫線帶星星回家',reward:'星空小探險家',order:[1,4,5,2,0,3]}
];
export function choicesFor(target,level,q){const others=WORDS.map((_,i)=>i).filter(i=>i!==target);const a=others[(level+q)%others.length];const b=others[(level+q+2)%others.length];const result=[target,a,b];const rotate=(q+level)%3;return result.slice(rotate).concat(result.slice(0,rotate));}
