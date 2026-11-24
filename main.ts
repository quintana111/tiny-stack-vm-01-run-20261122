import{readdirSync,readFileSync,writeFileSync,mkdirSync,existsSync}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(const id of readdirSync(I)){
const d=I+"/"+id;if(!existsSync(d+"/program.bin"))continue;
const P=readFileSync(d+"/program.bin"),N=readFileSync(d+"/input.bin"),n=P.length;
const D=new Int32Array(256);let s=0;const C=new Int32Array(64);let c=0;const M=new Int32Array(256);
const o=new Uint8Array(65536);let l=0,p=0,pc=0,t=0,e=0;
for(;;){
if(t===1e6){e=10;break}
if(pc<0||pc>=n){e=9;break}
const b=P[pc],im=b===1?1:b===2?4:b===0x30||b===0x31||b===0x32||b===0x33?2:0;
const ok=b===0||b===1||b===2||b===3||b===4||b===5||b===6||b===7||(b>=0x10&&b<=0x22)||(b>=0x30&&b<=0x34)||(b>=0x40&&b<=0x41)||(b>=0x50&&b<=0x53);
if(!ok){e=5;break}
if(pc+im>=n){e=9;break}
t++;const nx=pc+1+im;
const pops=b===3||b===4||b===0x17||b===0x1b||b===0x40||b===0x50||b===0x51||b===0x53?1:b===5||b===6||(b>=0x10&&b<=0x16)||(b>=0x18&&b<=0x22)||b===0x41?2:b===7?3:b===0x31||b===0x32?1:0;
const push=b===4||b===5?2:b===6||b===7?3:b===1||b===2||b===0x17||b===0x1b||b===0x40||b===0x52||(b>=0x10&&b<=0x16)||(b>=0x18&&b<=0x22)?1:0;
if(s<pops){e=2;break}
if(s-pops+push>256){e=3;break}
pc=nx;
if(b===0)break;
if(b===1)D[s++]=(P[nx-1]<<24)>>24;
else if(b===2)D[s++]=P[nx-4]|P[nx-3]<<8|P[nx-2]<<16|P[nx-1]<<24;
else if(b===3)s--;
else if(b===4){D[s]=D[s-1];s++}
else if(b===5){const q=D[s-1];D[s-1]=D[s-2];D[s-2]=q}
else if(b===6){D[s]=D[s-2];s++}
else if(b===7){const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a}
else if(b===0x17)D[s-1]=-D[s-1]|0;
else if(b===0x1b)D[s-1]=~D[s-1];
else if(b>=0x10&&b<=0x16||b>=0x18&&b<=0x22){
const y=D[s-1],a=D[s-2];let r=0;
if(b===0x10)r=a+y|0;else if(b===0x11)r=a-y|0;else if(b===0x12)r=Math.imul(a,y);
else if(b===0x13){if(!y){e=4;break}r=a===-2147483648&&y===-1?a:(a/y)|0}
else if(b===0x14){if(!y){e=4;break}r=y===-1?0:a%y|0}
else if(b===0x15){if(!y){e=4;break}r=Math.floor((a>>>0)/(y>>>0))|0}
else if(b===0x16){if(!y){e=4;break}r=(a>>>0)%(y>>>0)|0}
else if(b===0x18)r=a&y;else if(b===0x19)r=a|y;else if(b===0x1a)r=a^y;
else if(b===0x1c)r=a<<(y&31);else if(b===0x1d)r=a>>(y&31);else if(b===0x1e)r=(a>>>(y&31))|0;
else if(b===0x20)r=a===y?1:0;else if(b===0x21)r=a<y?1:0;else r=a>>>0<y>>>0?1:0;
s-=2;D[s++]=r}
else if(b===0x30||b===0x31||b===0x32){
const r=((P[nx-2]|P[nx-1]<<8)<<16)>>16;let k=1;
if(b!==0x30){const v=D[--s];k=b===0x31?v===0:v!==0}
if(k)pc=nx+r}
else if(b===0x33){if(c===64){e=7;break}C[c++]=nx;pc=P[nx-2]|P[nx-1]<<8}
else if(b===0x34){if(!c){e=8;break}pc=C[--c]}
else if(b===0x40){const a=D[s-1];if(a<0||a>255){e=6;break}D[s-1]=M[a]}
else if(b===0x41){const a=D[s-1],v=D[s-2];if(a<0||a>255){e=6;break}s-=2;M[a]=v}
else if(b===0x50){const g=String(D[s-1]);if(l+g.length>65536){e=11;break}s--;for(let i=0;i<g.length;i++)o[l++]=g.charCodeAt(i)}
else if(b===0x51){if(l+1>65536){e=11;break}o[l++]=D[--s]&255}
else if(b===0x52)D[s++]=p<N.length?N[p++]:-1;
else if(b===0x53){e=D[--s]&255;break}
}
const od=O+"/"+id;mkdirSync(od,{recursive:true});
writeFileSync(od+"/stdout.bin",o.subarray(0,l));
writeFileSync(od+"/exit.txt",e+"\n");
}
