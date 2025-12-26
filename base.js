/**
 * base.js - BASE OTIMIZADA
 */
(function() {
    const C = { TILE_SIZE: 35, GAP: 3 };
    const CAT = [
        { id: 'klotski', label: '👶 Klotski', d: 'Clássico' },
        { id: 'yin_yang', label: '☯️ Yin Yang', d: 'Equilíbrio' },
        { id: 'medusa', label: '🐙 Medusa', d: 'Tentáculos' },
        { id: 'hermes', label: '👟 Hermes', d: 'Velocidade' },
        { id: 'pandora', label: '📦 Pandora', d: 'Surpresa!' },
        { id: 'shakespeare', label: '💀 Shakespeare', d: 'Ser ou não ser' },
        { id: 'houdini', label: '🎩 Houdini', d: 'Mágica' },
        { id: 'saturno', label: '🪐 Saturno', d: 'No Espaço' },
        { id: 'malabarista', label: '🤹 Malabarista', d: 'Habilidade' },
        { id: 'aquiles', label: '🛡️ Aquiles', d: 'Guerra' },
        { id: 'maze', label: '🌀 Maze', d: 'Labirinto' },
        { id: 'sansao', label: '💪 Sansão', d: 'Força Bruta' },
        { id: 'gnomo', label: '🧙 Gnomo', d: 'Sabedoria' },
        { id: 'goblin', label: '👹 Goblin', d: 'Astúcia' },
        { id: 'napoleao', label: '👨‍✈️ Napoleão', d: 'Estratégia' },
        { id: 'polímata', label: '🧙 Polímata', d: 'Sabedoria' }
    ];
    const PR = { 
        gnomo: 35, goblin: 35,
        pandora: 45, klotski: 45, houdini: 45, malabarista: 45,
        aquiles: 55,
        saturno: 65,
        shakespeare: 75,
        hermes: 95, medusa: 95, yin_yang: 95, napoleao: 95, polímata: 95,
        sansao: 120,
        maze: 200 };
    const LV = [['novato',1],['aprendiz',2],['experiente',3],['veterano',4],['expert',5],['mestre',6],['prodígio',7],['superdotado',8],['gênio',9]];

    // Parser e Dados
    const p = s => s.trim().split('\n').map(l => l.trim().split(''));
    const R = {
        klotski:[['Klotski','Fácil',`
######
#a@@b#
#a@@b#
#zdde#
#zqwe#
#p..k#
##??##`],['Diabólico','Médio',`
######
#a@@b#
#a@@b#
#zzdd#
#wqqe#
#p..k#
##??##`],['Porão','Muito Difícil',`
######
#zbcd#
#@@ed#
#@@ef#
#.qqf#
#.pkk#
##??##`]],yin_yang:[['Yin Yang','Complexo',`
######
#a@@b#
#ad@c#
#vddf#
#vqqf#
#g..k#
###??#`],['Taj Mahal','Médio',`
######
#wzzb#
#a@zc#
#a@@c#
#vvff#
#g..k#
###??#`]],medusa:[['Medusa','Complexo',`
######
#a@@b#
#a.zc#
#w.zc#
#week#
#yggk#
##??##`],['Espelho','Fácil',`
######
#vvbb#
#d@@c#
#dezc#
#wezk#
#.gg.#
##??##`]],hermes:[['Hermes','Muito Difícil',`
######
#.@bb#
#.@@c#
#eezz#
#wtvk#
#wggk#
##??##`],['Trismegisto','Muito Difícil',`
######
#qbb.#
#d@.c#
#d@@c#
#gttv#
#wwkk#
##??##`],['Furacão','Extremo',`
######
#.bac#
#d@@c#
#d@ww#
#ggyk#
#.zzk#
##??##`],['Elevador','Extremo',`
######
#@bdd#
#@@.c#
#weec#
#wttv#
#gh.v#
##??##`]],pandora:[['Pandora','Fácil',`
######
#zzd@#
#zzcc#
#wecc#
#wtt.#
#ggv.#
####?#`]],shakespeare:[['Shakespeare','Muito Difícil',`
#####.
#qb.##
#wbb.#
#@@cc#
##tv.?
.#####`]],houdini:[['Houdini','Fácil',`
#####.
#@.d##
#@@dc#
#w.tc#
?fft.#
?.vv##
#####.`]],saturno:[['Saturno','Médio',`
######
#w@@c#
#wwcc#
#f..z#
#f..z#
#ggvv#
##??##`],['Oráculo','Médio',`
######
#w@@c#
#wwcc#
#ffzz#
#g..v#
#g..v#
##??##`]],malabarista:[['Malabarista','Fácil',`
######
#.@@.#
#b@cw#
#fccz#
#ffzz#
#g..v#
##??##`],['Palhaço','Fácil',`
######
#g@@v#
#b@cw#
#fccz#
#ffzz#
#....#
##??##`]],aquiles:[['Aquiles','Difícil',`
######
#.@@w#
#bbtw#
#fccz#
#f.vz#
##??##`],['Elementos','Fácil',`
######
#..tp#
#@@tw#
#fkcc#
#fvvz#
##??##`]],maze:[['Maze','Impossível',`
#######
#bbaac#
#@.ddf#
#@@ddf#
#wggpk#
#xggpk#
##.zzq#
.##??##`],['Rosa','Difícil',`
#######
#@@acc#
#q@aif#
#ssddf#
#ssgkk#
#xvvp.#
##vvp.#
.##??##`],['Cruz','Extremo',`
#######
#qqaac#
#qqr.c#
#suyd@#
#s.g@@#
#xxgpp#
##vvpp#
.##??##`],['Lousa','Extremo',`
#######
#qwaav#
#qurrc#
#.urrc#
#@mggk#
#@@.pp#
##vvpp#
.##??##`],['Estrela','Extremo',`
#######
#@@avv#
#@bavv#
#uurcc#
#mmgok#
#mmgpk#
##vv..#
.##??##`],['Portal','Extremo',`
#######
#.ww@@#
#.urr@#
#qurrc#
#xmmkk#
#nvppt#
##vppt#
.##??##`],['Pitágoras','Extremo',`
#######
#.waav#
#.waac#
#@uurr#
#@@ggk#
#yvppo#
##vppo#
.##??##`],['Crucifixo','Extremo',`
#######
#hhavv#
#ubjlb#
#u.r@b#
#mmr@@#
#mm.kk#
##vvkk#
.##??##`],['Chave','Extremo',`
#######
#ww@@e#
#uu@.e#
#uurkc#
#xmmk.#
#xvvtt#
##vvpl#
.##??##`],['Máscara','Sobre-humano',`
#######
#wwaav#
#@.u.r#
#@@ugr#
#hhtgk#
#hhfoo#
##ppoo#
.##??##`]],sansao:[['Sansão','Difícil',`
###########
#zzbb@ccdd#
#zzb@@@cdd#
#efgg@oors#
#efhg@oprs#
#ikhhjpptu#
#ikmjjjqtu#
#nn.....xx#
####???####`],['Verdade Absoluta','Complexo',`
###########
#wwbb@ccdd#
#wwb@@@cdd#
#efgg@oors#
#efhg@oprs#
#ikhhjpptu#
#ikmjjjqtu#
#nn..z..xx#
####???####`],['Ancestral','Difícil',`
###########
#zzbb@ccdd#
#zzb@@@cdd#
#efgg@oors#
#efwg@oyrs#
#ikhjjjptu#
#ikhhjpptu#
#nn.....xx#
####???####`],['Erudito','Médio',`
###########
#zzbb@ccdd#
#zzb@@@cdd#
#efgg@oors#
#efhg@oprs#
#ikhhxpptu#
#ikmjjjqtu#
#nn.....xx#
####???####`],
],gnomo:[['Gnomo','Trivial',`
######
#q@@w#
#f..w#
#fccz#
##.v##
.#??#.`]],goblin:[['Goblin','Trivial',`
######
#.kww#
#@@c.#
##gc.#
.#vv##
.#??#.`]],napoleao:[['Napoleão','Complexo',`
#######
#b@@zp#
#b@@zk#
#aayyk#
#xuuwr#
#x#.wt#
###..t#
..#??##`]],polímata:[['Polímata','Complexo',`
#######
#.@@kp#
#q@@kp#
#aayym#
#x.u#m#
#xfutt#
#hf.###
#??##..`]]
    };

    // Processamento
    const GP = {};
    const ALL = [];
    const GM = Object.fromEntries(Object.entries(R).map(([k, v]) => {
        const games = v.map(x => ({ name: x[0], difficulty: x[1], grid: p(x[2]) }));
        games.forEach(g => { GP[g.name] = PR[k] || 0; ALL.push(g); });
        return [k, games];
    }));

    window.PuzzleBase = { CONFIG:C, CATEGORIES:CAT, LEVELS:LV, PRICE_TABLE:PR, GAME_PRICES:GP, GAMES:GM, ALL_GAMES:ALL };
})();