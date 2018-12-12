// title:  music test
// author: ericschn
// desc:   sick tunes
// script: js

var t=0
var x=96
var y=24

function TIC()
{
	if(btn(0))y--
	if(btn(1))y++
	if(btn(2))x--
	if(btn(3))x++

	cls(16)
	spr(1+((t%60)/30|0)*2,x,y,14,3,0,0,2,2)
	print("HELLO WORLD!",84,84)
	print(t)

	rect(60,60,60,60);

	t++
	if (t > 60) t = 0;
}

// <TILES>
// 000:1111111110000111100001111000011110000111111111111111111111111111
// 001:efffffffff222222f8888888f8222222f8fffffff8ff0ffff8ff0ffff8ff0fff
// 002:fffffeee2222ffee88880fee22280feefff80fff0ff80f0f0ff80f0f0ff80f0f
// 003:efffffffff222222f8888888f8222222f8fffffff8fffffff8ff0ffff8ff0fff
// 004:fffffeee2222ffee88880fee22280feefff80ffffff80f0f0ff80f0f0ff80f0f
// 017:f8fffffff8888888f888f888f8888ffff8888888f2222222ff000fffefffffef
// 018:fff800ff88880ffef8880fee88880fee88880fee2222ffee000ffeeeffffeeee
// 019:f8fffffff8888888f888f888f8888ffff8888888f2222222ff000fffefffffef
// 020:fff800ff88880ffef8880fee88880fee88880fee2222ffee000ffeeeffffeeee
// </TILES>

// <WAVES>
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:020002000200020002000200020002000200020002000200020002000200020002000200020002000200020002000200020002000200020002000200200000000000
// 001:00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000050b000000000
// 004:030003000300030003000300030003000300030003000300030003000300030003000300030003000300030003000300030003000300030003000300000000000000
// </SFX>

// <PATTERNS>
// 000:da0004100000da00021000000000000000000000000000000000000000000000000000008900041a0010b90004100000d90004100000d90002100000000000000000000000000000000000000000000000000000000000000000000000000000da0004100000da00021000000000000000000000000000000000000000000000000000008900041a0010b90004100000d90004100000890004190000b90004100000490004100000690004000000890004000000100000000000f90002000000
// 001:8e00181000004e0018100000de00161000004e00181000008e00181000004e0018100000de00161000004e00181000008d00181000004d0018100000dd00161000004d00181000008d00181000004d0018100000dd00161000004d00181000008d00181000004d0018100000dd00161000004d00181000008d00181000004d0018100000dd00161000004d00181000008d00181000004d0018100000dd00161000004d00181000008d00181000004d0018100000dd00161000004d0018100000
// 003:4a0042100000000000100000fd004e1000001000001000004a0046100000100000100000fd004e1000001000001000004a0042100000000000100000fd004e1000004a00421000004a0046100000100000100000fd004e1000001000001000004a00421000001a0040100000fd004e1000001000001000004a0046100000100000100000fd004e1000001000001000004a00421000001a0040100000fd004e1000001000001000004a0046100000100000100000fd004e100000100000100000
// </PATTERNS>

// <TRACKS>
// 000:180001100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 001:5817020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ef
// </TRACKS>

// <PALETTE>
// 000:140c1c44243430346d4e4a4e854c30346524d04648757161597dced27d2c8595a16daa2cd2aa996dc2cadad45edeeed6
// </PALETTE>

