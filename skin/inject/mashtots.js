/*
 *  Mashtots 2.0.6
 */
(function(window){
    var vowel = "ԱԵԷԸԻՈՕաեիէըոօ";
    var sonant = "ԲԳԴԶԹԺԼԽԾԿՀՁՂՃՄՅՆՇՉՊՋՌՍՎՏՐՑՓՔՖբգդզթժլխծկհձղճմյնշչպջռսվտրցփքֆ";
    var alphabet = "ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔևՕՖաբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ";
    var alphabetWithoutH = "ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔևՕՖաբգդեզէըթժիլխծկձղճմյնշոչպջռսվտրցւփքօֆ";
    var alphabetWithoutAOJ = "ԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՆՇՉՊՋՌՍՎՏՐՑՒՓՔևՕՖբգդեզէըթժիլխծկհձղճմնշչպջռսվտրցւփքօֆ";
    var endOfWord = "[^" + alphabet + "՞՜]|$";
    var beginningOfWord = "[^" + alphabet + "]|^";
    var data = [
        // Բառմիջում և բառավերջում ա, ե, ի ձայնավորներից հետո վ լսվելիս գրվում է ւ  // սա իրա մեջ ներառում է //  բառավերջում կամ ձայնավորից առաջ    իվ -> իւ
        {
            "0": "([աեիԱԵԻ])վ",
            "1": "$1ւ",
            "2": "([աեիԱԵԻ])ւ",
            "3": "$1վ"
        },
        //  և - եւ
        {
            "0": "և",
            "1": "եւ",
            "2": "եւ",
            "3": "և"
        },
        // բաղաձայնից առաջ    յու -> իւ
        { 
            "0": "([^" + vowel + "]|" + beginningOfWord + ")յու([" + sonant + "])",
            "1": "$1իւ$2",
            "2": "([^" + vowel + "]|" + beginningOfWord + ")իւ([" + sonant + "])", 
            "3": "$1յու$2"
        },
        // TODO:
        // ո -ից հետո վ -> ւ չի դառնում
        //
        // բարդ բառերում եթե երկրորդ բառը սկսվում է վ տառով, ապա վ մնում է, 
        // օր․ ՝  պատմավէպ, կարեվէր, անվերջ
        // այս կետը բաց է մնում
        //
        //  ա,ե,է,ի,ո  ձայնավորներից առաջ, բաղաձայնից և յ կիսաձայնից հետո  վ -> ու
        {
            "0": "([" + sonant + "յ])վ([աեէիո])",
            "1": "$1ու$2",
            "2": "([" + sonant + "յ])ու([աեէիո])",
            "3": "$1վ$2"
        },
        // բառավերջի ե -> է
        {
            "0": "([" + alphabet + "])ե(" + endOfWord + ")",
            "1": "$1է$2",
            "2": "([" + alphabet + "])է(" + endOfWord + ")",
            "3": "$1ե$2"
        },
        // ույ -> ոյ    բոլոր իմ տեսած օրինակներում ույ-գտնվում է բաղաձայների մեջ, ինչպես նաև խուսափում ենք այնպիսի ոյան ազգանունների փոփոխելուց 
        { 
            "0": "([" + sonant + "])ույ([" + sonant + "])",
            "1": "$1ոյ$2",
            "2": "([" + sonant + "])ոյ([" + sonant + "])",
            "3": "$1ույ$2"
        },
        // յա -> եա  /բայց ոչ բառասկզբում և ոչ ա,ո-ից հետո + յ տառից հետո
        {
            "0": "([" + alphabetWithoutAOJ + "])յա",
            "1": "$1եա",
            "2": "([" + alphabetWithoutAOJ + "])եա",
            "3": "$1յա"
        },
        // յո -> եօ
        {
            "0": "յո([^ւ])",
            "1": "եօ$1",
            "2": "եօ",
            "3": "յո"
        },
        // յո -> եօ
        {
            "0": "Յո([^ւ])",
            "1": "Եօ$1",
            "2": "Եօ",
            "3": "Յո"
        },
        // բառասկզբում յ գրելու համար օրենք չկա պետք է հիշել այդ բառերը
        {
            "0": "հ(ագե|ախճապակ|ախուռն|ածանա|ակինթ|աղթ|աճախ|ամառ|ամր|այտ|անդիման|անդուգն|անկարծ|անկերգ|անձ|անցագործ|անցանք|ապաղ|ապավ|ապաւ|աջող|աջորդ|առ|ասմիկ|ասպիս|ավերժ|ատակ|ատկ|ատուկ|արաբ|արազ|արգ|արդա|արձ|արմ|արութ|աւակ|աւել|աւելեալ|աւետ|աւէտ|աւիտ|ափշտակ|եղա|են|եսան|ետա|երյուրանք|իմար|իշ|իսն|իսուն|իրավի|ղ|ոբել|ոգն|ոդ|ոժար|ոխորտալ|ողդողդ|ոյզ|ոյժ|ոյս|ոնք|ոշոտ|ոպոպ|ոռի|ովազ|ովատակ|ովսե|որանջ|որդ|որդոր|որին|որձ|որջորջել|ուզ|ուլիս|ուղարկ|ույն|ույս|ունապ|ունիս|ունուար|ուշ|ուռթի|ուռութ|ուսա|ստակագեն)",
            "1": "յ$1",
            "2": "յ(ագե|ախճապակ|ախուռն|ածանա|ակինթ|աղթ|աճախ|ամառ|ամր|այտ|անդիման|անդուգն|անկարծ|անկերգ|անձ|անցագործ|անցանք|ապաղ|ապավ|ապաւ|աջող|աջորդ|առ|ասմիկ|ասպիս|ավերժ|ատակ|ատկ|ատուկ|արաբ|արազ|արգ|արդա|արձ|արմ|արութ|աւակ|աւել|աւելեալ|աւետ|աւէտ|աւիտ|ափշտակ|եղա|են|եսան|ետա|երյուրանք|իմար|իշ|իսն|իսուն|իրավի|ղ|ոբել|ոգն|ոդ|ոժար|ոխորտալ|ողդողդ|ոյզ|ոյժ|ոյս|ոնք|ոշոտ|ոպոպ|ոռի|ովազ|ովատակ|ովսե|որանջ|որդ|որդոր|որին|որձ|որջորջել|ուզ|ուլիս|ուղարկ|ույն|ույս|ունապ|ունիս|ունուար|ուշ|ուռթի|ուռութ|ուսա|ստակագեն)",
            "3": "հ$1"
        },
        // բառասկզբում յ գրելու համար օրենք չկա պետք է հիշել այդ բառերը
        {
            "0": "Հ(ագե|ախճապակ|ախուռն|ածանա|ակինթ|աղթ|աճախ|ամառ|ամր|այտ|անդիման|անդուգն|անկարծ|անկերգ|անձ|անցագործ|անցանք|ապաղ|ապավ|ապաւ|աջող|աջորդ|առ|ասմիկ|ասպիս|ավերժ|ատակ|ատկ|ատուկ|արաբ|արազ|արգ|արդա|արձ|արմ|արութ|աւակ|աւել|աւելեալ|աւետ|աւէտ|աւիտ|ափշտակ|եղա|են|եսան|ետա|երյուրանք|իմար|իշ|իսն|իսուն|իրավի|ղ|ոբել|ոգն|ոդ|ոժար|ոխորտալ|ողդողդ|ոյզ|ոյժ|ոյս|ոնք|ոշոտ|ոպոպ|ոռի|ովազ|ովատակ|ովսե|որանջ|որդ|որդոր|որին|որձ|որջորջել|ուզ|ուլիս|ուղարկ|ույն|ույս|ունապ|ունիս|ունուար|ուշ|ուռթի|ուռութ|ուսա|ստակագեն)",
            "1": "Յ$1",
            "2": "Յ(ագե|ախճապակ|ախուռն|ածանա|ակինթ|աղթ|աճախ|ամառ|ամր|այտ|անդիման|անդուգն|անկարծ|անկերգ|անձ|անցագործ|անցանք|ապաղ|ապավ|ապաւ|աջող|աջորդ|առ|ասմիկ|ասպիս|ավերժ|ատակ|ատկ|ատուկ|արաբ|արազ|արգ|արդա|արձ|արմ|արութ|աւակ|աւել|աւելեալ|աւետ|աւէտ|աւիտ|ափշտակ|եղա|են|եսան|ետա|երյուրանք|իմար|իշ|իսն|իսուն|իրավի|ղ|ոբել|ոգն|ոդ|ոժար|ոխորտալ|ողդողդ|ոյզ|ոյժ|ոյս|ոնք|ոշոտ|ոպոպ|ոռի|ովազ|ովատակ|ովսե|որանջ|որդ|որդոր|որին|որձ|որջորջել|ուզ|ուլիս|ուղարկ|ույն|ույս|ունապ|ունիս|ունուար|ուշ|ուռթի|ուռութ|ուսա|ստակագեն)",
            "3": "Հ$1"
        },
        // բառավերջում ա -ից հետո դրվում է չկարդացվող յ, բացառություն են կազմում սա դա նա սրա դրա նրա, alphabetWithoutH-ով բացառում ենք հայ-ի դեպքը
        {
            "0": "([" + alphabet + "][" + alphabetWithoutH + "])ա(" + endOfWord + ")",
            "1": "$1այ$2",
            "2": "([" + alphabet + "][" + alphabetWithoutH + "])այ("+ endOfWord +")",
            "3": "$1ա$2"
        },
        // բառավերջում ո -ից հետո դրվում է չկարդացվող յ  // սա առանձնացվել է հատուկ հայ բառի պատճառով
        { 
            "0": "([" + alphabet + "])ո(" + endOfWord + ")",
            "1": "$1ոյ$2",
            "2": "([" + alphabet + "])ոյ(" + endOfWord + ")",
            "3": "$1ո$2"
        },
        // բառավերջի  են ->  Էն
        {
            "0": "([" + alphabet + "])են(" + endOfWord + ")",
            "1": "$1էն$2",
            "2": "([" + alphabet + "])էն(" + endOfWord + ")",
            "3": "$1են$2"
        },
        /*
        //բառավերջի  ոն ->  օն
        {
            "0": "([" + alphabet + "])ոն($)",
            "1": "$1օն$2",
            "2": "([" + alphabet + "])օն($)",
            "3": "$1ոն$2"
        }
        */
    ];
    // սխալների ուղղում կամ բացառություններ
    errorCorrectionSovietToMashtots = [
        {"0":"սրայ","1":"սրա"}, {"0":"Սրայ","1":"Սրա"}, {"0":"դրայ","1":"դրա"}, {"0":"Դրայ","1":"Դրա"},
        {"0":"նրայ","1":"նրա"}, {"0":"Նրայ","1":"Նրա"}, {"0":"հիմայ","1":"հիմա"}, {"0":"Հիմայ","1":"Հիմա"}, 
        {"0":"ապայ","1":"ապա"}, {"0":"Ապայ","1":"Ապա"}, {"0":"նրայ","1":"նրա"},{"0":"Նրայ","1":"Նրա"}, 
        {"0":"ահայ","1":"ահա"}, {"0":"Ահայ","1":"Ահա"}, {"0":"այոյ","1":"այո"}, {"0":"Այոյ","1":"Այո"}, 
        {"0":"աղայ","1":"աղա"},  {"0":"Աղայ","1":"Աղա"} ,{"0":"փաշայ","1":"փաշա"}, {"0":"Փաշայ","1":"Փաշա"}, 
        {"0":"ամիրայ","1":"ամիրա"},{"0":"Ամիրայ","1":"Ամիրա"}, {"0":"կակաոյ","1":"կակաո"}, {"0":"Կակաոյ","1":"Կակաո"},
        {"0":"այոյ","1":"այո"}, {"0":"Այոյ","1":"Այո"}, {"0":"Ամէնա", "1":"Ամենա"},
        {"0":"Փօքր", "1":"Փոքր"}, {"0":"կօնք", "1":"կոնք"}, {"0":"Կօնք", "1":"Կոնք"},
        {"0":"Վու", "1":"Ւու"}, {"0":"ուու", "1":"ւու"}, {"0":"Ուու", "1":"Ւու"}, 
        {"0":"էւ", "1":"եւ"}, {"0":"Էւ", "1":"Եւ"}, {"0": "քոյ", "1":"քո"}, {"0": "Քոյ", "1":"Քո"},
        {"0": "կա", "1":"կայ"}, {"0": "Կա", "1":"Կայ"},{"0": "գա", "1":"գայ"}, {"0": "Գա", "1":"Գայ"}, 
        {"0":"գեր", "1":"գէր"}, {"0":"Գեր", "1":"Գէր"}, {"0":"մնայ", "1":"մնա"},{"0":"տէրեւ","1":"տերև"}
    ];
    var errorCorrectionSovietToMashtotsInTheWord = [
        {"0":"ակադեմ","1":"ակադէմ"},
        {"0":"փօքր", "1":"փոքր"}, {"0":"վու", "1":"ւու"}, {"0":"աւէտ", "1":"աւետ"}, {"0":"նուէր", "1":"նուեր"},
        {"0":"յաւետ", "1":"յաւէտ"}, {"0":"գմբեթ", "1":"գմբէթ"}, {"0":"մեկ", "1":"մէկ"}, 
        {"0":"թեպետ", "1":"թէպէտ"}, {"0":"Աբել", "1":"Աբէլ"},
        {"0":"ուու", "1":"ւու"}, {"0":"սէրնդ", "1":"սերնդ"}, {"0":"սէրունդ", "1":"սերունդ"},  {"0":"ղեկաւար", "1":"ղեկավար"},
        {"0":"Աւէտիք", "1":"Աւետիք"}, {"0":"Հակոբ", "1":"Յակոբ"},  {"0":"ազգէր", "1":"ազգեր"},  {"0":"ակտիւորէն", "1":"ակտիւօրէն"},
        {"0":"ամենաւ", "1":"ամենավ"}, {"0":"ամենուր", "1":"ամէնուր"}, {"0":"սէրել", "1":"սերել"}, {"0":"սէրվ", "1":"սերվ"}, 
        {"0":"անուերջ", "1":"անվերջ"}, {"0":"ւարձ", "1":"վարձ"}, {"0":"տոմսէր", "1":"տոմսեր"}, {"0":"եութիւն", "1":"էութիւն"},
        {"0":"եղբոր", "1":"եղբօր"}, {"0":"երեկ", "1":"երէկ"},  {"0":"կէնդ", "1":"կենդ"}, 
        {"0":"աեօվ", "1":"այով"}, {"0":"իդեալ", "1":"իդէալ"}, {"0":"կէնս", "1":"կենս"}, 
        {"0":"իրէն", "1":"իրեն"}, {"0":"կէնտ", "1":"կենտ"}, {"0":"ոյան", "1":"ոյեան"}, {"0":"կէնս", "1":"կենս"}, {"0":"իրէն", "1":"իրեն"}, 
        {"0":"խօստ", "1":"խոստ"}, {"0":"ծափայար", "1":"ծափահար"}, 
        {"0":"յարաւ", "1":"հարաւ"}, {"0":"յարբ", "1":"հարբ"}, {"0":"յարիր", "1":"հարիր"}, {"0":"յարկ", "1":"հարկ"}, {"0":"յարիւր", "1":"հարիւր"}, 
        {"0":"յարց", "1":"հարց"}, {"0":"յենց", "1":"հենց"}, {"0":"յոդուած", "1":"յօդուած"}, 
        {"0":"հօրդոր", "1":"յորդոր"}, {"0":"ւառ", "1":"վառ"}, {"0":"հրեշ", "1":"հրէշ"}, 
        {"0":"մայար", "1":"մահար"}, {"0":"ւայր", "1":"վայր"}, {"0":"որօնք", "1":"որոնք"}, {"0":"(" + beginningOfWord + ")ցող", "1":"$1ցօղ"}, 
        {"0":"պատայար", "1":"պատահար"}, {"0":"պոեմ", "1":"պօէմ"}, {"0":"հետո", "1":"յետո"},
        {"0":"երէկո", "1":"երեկո"}, {"0":"հոլովակ", "1":"յոլովակ"},
        {"0":"սկավառ", "1":"սկաւառ"}, {"0":"մէկն", "1":"մեկն"}, {"0":"մեքէնա", "1":"մեքենա"},{"0":"տերև", "1":"տերեւ"},
        {"0":"րոպե", "1":"րոպէ"},{"0":"հրեա", "1":"հրէա"},
        {"0":"շատէր", "1":"շատեր"}, {"0":"պատէր", "1":"պատեր"}, {"0":"կնուիրուէն", "1":"կնուիրուեն"},
    ];
    var errorCorrectionMashtotsToSovietInTheWord = [
        {"0":"փօքր", "1":"փոքր"}, {"0":"վու", "1":"ւու"}, {"0":"աւէտ", "1":"աւետ"},  {"0":"նվեր", "1":"նուեր"},  
        {"0":"հրավեր", "1":"հրավէր"}, {"0":"հրեշ", "1":"հրէշ"}, 
        {"0":"հավետ", "1":"յաւէտ"}, {"0":"գմբեթ", "1":"գմբէթ"}, {"0":"մեկ", "1":"մէկ"}, {"0":"հոլովակ", "1":"յոլովակ"},
        {"0":"թեպետ", "1":"թէպէտ"}, {"0":"Աբել", "1":"Աբէլ"}, 
        {"0":"մանրէ", "1":"մանրե"}, {"0":"ուու", "1":"ւու"},{"0":"սէրնդ", "1":"սերնդ"},
        {"0":"սէրունդ", "1":"սերունդ"},  {"0":"ղեկաւար", "1":"ղեկավար"}, {"0":"Աւէտիք", "1":"Աւետիք"}, {"0":"Հակոբ", "1":"Յակոբ"},
        {"0":"ակտիւորէն", "1":"ակտիւօրէն"}, {"0":"ամենաւ", "1":"ամենավ"},  {"0":"ամենուր", "1":"ամէնուր"}, 
        {"0":"սէրել", "1":"սերել"}, {"0":"սէրվ", "1":"սերվ"}, {"0":"անուերջ", "1":"անվերջ"}, 
        {"0":"տոմսէր", "1":"տոմսեր"}, {"0":"բարօր", "1":"բարոր"},  {"0":"եութիւն", "1":"էութիւն"}, {"0":"եղբոր", "1":"եղբօր"}, {"0":"երեկ", "1":"երէկ"}, 
        {"0":"աեօվ", "1":"այով"}, {"0":"իդեալ", "1":"իդէալ"}, {"0":"հետո", "1":"յետո"},
        {"0":"ոյան", "1":"ոյեան"}, {"0":"հաշիվ", "1":"հաշիւ"}, {"0":"յոդուած", "1":"յօդուած"}, {"0":"հօրդոր", "1":"յորդոր"},
        {"0":"ցող", "1":"ցօղ"},  {"0":"հորդոր", "1":"հօրդոր"}, {"0":"հրավեր", "1":"հրաւէր"},
        {"0":"սկավառ", "1":"սկաւառ"}, {"0":"պոեմ", "1":"պօէմ"}, {"0":"րոպե", "1":"րոպէ"}
    ];
    var errorCorrectionMashtotsToSoviet = [
        {"0": "խո", "1":"խոյ"}, {"0": "Խո", "1":"Խոյ"},{"0": "Նո", "1":"Նոյ"}, {"0":"կայ", "1":"կա"}, {"0":"Կայ", "1":"Կա"},{"0":"մանրե", "1":"մանրէ"},{"0":"գէր", "1":"գեր"}, 
        {"0":"Գէր", "1":"Գեր"},{"0":"չե", "1":"չէ"},{"0":"Չե", "1":"Չէ"}, {"0":"տարորինակ", "1":"տարօրինակ"}, 
        {"0":"անոթևան", "1":"անօթևան"},{"0":"հրյա", "1":"հրեա"}
    ];
    //ածանցներ և արմատներ, որոնք պետք է ուղղակի հիշվեն
    var wordsParts = [
        {"0":"ավոր", "1":"աւոր"}, {"0":"վետ", "1":"ւէտ"}, {"0":"ավուն", "1":"աւուն"}, {"0":"զեն", "1":"զէն"}, 
        {"0":"դեմ", "1":"դէմ"},{"0":"դեպ", "1":"դէպ"}, {"0":"տեր", "1":"տէր"}, 
        {"0":"աղետ", "1":"աղէտ"}, {"0":"արժեք", "1":"արժէք"}, {"0":"արեն", "1":"արէն"},
        {"0":"գետ", "1":"գէտ"}, {"0":"դեպ", "1":"դէպ"}, {"0":"դետ", "1":"դէտ"},
        {"0":"եղեն", "1":"եղէն"}, {"0":"երեն", "1":"երէն"}, {"0":"երեց", "1":"երէց"},  
        {"0":"կեն", "1":"կէն"}, {"0":"կետ", "1":"կէտ"},  {"0":"մետ", "1":"մէտ"}, {"0":"մեջ", "1":"մէջ"}, 
        {"0":"շեն", "1":"շէն"}, {"0":"պես", "1":"պէս"}, {"0":"սեր", "1":"սէր"}, {"0":"վեժ", "1":"վէժ"},
        {"0":"վեպ", "1":"վէպ"}, {"0":"վերք", "1":"վէրք"}, {"0":"վրեպ", "1":"վրէպ"},{"0":"քեն", "1":"քէն"}, {"0":"օրեն", "1":"օրէն"},{"0":"աղեկեզ", "1":"աղեկէզ"},{"0":"աղետ", "1":"աղէտ"},
        {"0":"աղվես", "1":"աղուէս"},{"0":"ամեն", "1":"ամէն"},{"0":"անգետ", "1":"անգէտ"},{"0":"անզեն", "1":"անզէն"},
        {"0":"անեծք", "1":"անէծք"},{"0":"անշեջ", "1":"անշէջ"},{"0":"աշղետ", "1":"աշղէտ"},{"0":"ապավեն", "1":"ապաւէն"},
        {"0":"գեթ", "1":"գէթ"},{"0":"գեշ", "1":"գէշ"},{"0":"գես", "1":"գէս"},{"0":"գետ", "1":"գէտ"},{"0":"գեր", "1":"գէր"},
        {"0":"գմբեթ", "1":"գմբէթ"},{"0":"գոմեշ", "1":"գոմէշ"},{"0":"դեզ", "1":"դէզ"},{"0":"դեմ", "1":"դէմ"},
        {"0":"ապաքեն", "1":"ապաքէն"},{"0":"առնետ", "1":"առնէտ"},{"0":"ասպարեզ", "1":"ասպարէզ"},{"0":"արդեն", "1":"արդէն"},
        {"0":"արալեք", "1":"արալէք"},{"0":"արժեք", "1":"արժէք"},{"0":"բզեզ", "1":"բզէզ"},{"0":"բվեճ", "1":"բուէճ"},
        {"0":"բրետ", "1":"բրէտ"},{"0":"զենք", "1":"զէնք"},{"0":"զենիթ", "1":"զէնիթ"},{"0":"ընդդեմ", "1":"ընդդէմ"},
        {"0":"ընկեց", "1":"ընկէց"},{"0":"թեև", "1":"թէև"},{"0":"թեժ", "1":"թէժ"},{"0":"թեպետ", "1":"թէպէտ"},
        {"0":"ժամկետ", "1":"ժամկէտ"},{"0":"ժապավեն", "1":"ժապաւէն"},{"0":"լեգեոն", "1":"լեգէոն"},{"0":"խաբեություն", "1":"խաբէութիւն"},{"0":"խեթ", "1":"խէթ"},{"0":"խեժ", "1":"խէժ"},{"0":"խլեզ", "1":"խլէզ"},
        {"0":"ծես", "1":"ծէս"},{"0":"ծովահեն", "1":"ծովահէն"},{"0":"ծվեն", "1":"ծուէն"},{"0":"կեզ", "1":"կէզ"},
        {"0":"կես", "1":"կէս"},{"0":"կողպեք", "1":"կողպէք"},{"0":"կուզեկուզ", "1":"կուզէկուզ"},{"0":"դեմք", "1":"դէմք"},
        {"0":"դեն", "1":"դէն"},{"0":"դեպի", "1":"դէպի"},{"0":"դեպք", "1":"դէպք"},{"0":"ելակետ", "1":"ելակէտ"},
        {"0":"ելևեջ", "1":"ելևէջ"},{"0":"եզեգ", "1":"եզէգ"},{"0":"մեգ", "1":"մէգ"},{"0":"մեզ", "1":"մէզ"},{"0":"մեկ", "1":"մէկ"},
        {"0":"մեն", "1":"մէն"},{"0":"մեջ", "1":"մէջ"},{"0":"մետ", "1":"մէտ"},{"0":"մողես", "1":"մողէս"},
        {"0":"հավետ", "1":"յաւէտ"},{"0":"հետադեմ", "1":"յետադէմ"},{"0":"նշանդրեք", "1":"նշանդրէք"},{"0":"նվեր", "1":"նուէր"},
        {"0":"շահեն", "1":"շահէն"},{"0":"շեկ", "1":"շէկ"},{"0":"շեն", "1":"շէն"},{"0":"ողջակեզ", "1":"ողջակէզ"},
        {"0":"ուղեշ", "1":"ուղէշ"},{"0":"չեզոք", "1":"չէզոք"},{"0":"պանթեոն", "1":"պանթէոն"},{"0":"պարեն", "1":"պարէն"},
        {"0":"պարետ", "1":"պարէտ"},{"0":"պարտեզ", "1":"պարտէզ"},{"0":"պետք", "1":"պէտք"},{"0":"պնակալեզ", "1":"պնակալէզ"},
        {"0":"կրկես", "1":"կրկէս"},{"0":"կրետ", "1":"կրէտ"},{"0":"հանպեդ", "1":"հանդէպ"},{"0":"հանդես", "1":"հանդէս"},
        {"0":"հեգ", "1":"հէգ"},{"0":"հելլեն", "1":"հելլէն"},{"0":"հեն", "1":"հէն"},{"0":"հյուսկեն", "1":"հիւսկէն"},
        {"0":"հրավեր", "1":"հրաւէր"},{"0":"հրեշ", "1":"հրէշ"},{"0":"հրշեջ", "1":"հրշէջ"},
        {"0":"ձեթ", "1":"ձէթ"},{"0":"տեգ", "1":"տէգ"},{"0":"տերունական", "1":"տէրունական"},{"0":"տերտեր", "1":"տէրտէր"},
        {"0":"տնօրեն", "1":"տնորէն"},{"0":"փոխարեն", "1":"փոխարէն"},{"0":"ջրվեժ", "1":"ջրվէժ"},{"0":"ջրօրհնեք", "1":"ջրօրհնէք"},
        {"0":"սեգ", "1":"սէգ"},{"0":"սեզ", "1":"սէզ"},{"0":"սպառազեն", "1":"սպառազէն"},{"0":"վեճ", "1":"վէճ"},{"0":"վեմ", "1":"վէմ"},
        {"0":"վեպ", "1":"վէպ"},{"0":"վէս", "1":"վես"},{"0":"վերք", "1":"վէրք"},{"0":"վրեժ", "1":"վրէժ"},{"0":"տարեց", "1":"տարէց"},
        {"0":"փորձագետ", "1":"փորձագէտ"},{"0":"փրփադեզ", "1":"փրփրադէզ"},{"0":"քարտեզ", "1":"քարտէզ"},{"0":"քեն", "1":"քէն"},
        {"0":"քնեած", "1":"քնէած"},{"0":"քրեական", "1":"քրէական"},
        //բառամիջում օ հանդիպող հիմնական բառերը
        {"0":"աղոթք", "1":"աղօթք"}, {"0":"աղոտ", "1":"աղօտ"}, {"0":"անոթ", "1":"անօթ"}, 
        {"0":"առավոտ", "1":"առաւօտ"},{"0":"արոտ", "1":"արօտ"}, {"0":"արոր", "1":"արօր"}, 
        {"0":"դրոշ", "1":"դրօշ"}, {"0":"զբոսն", "1":"զբօսն"}, {"0":"զգոն", "1":"զգօն"}, 
        {"0":"զոդ", "1":"զօդ"}, {"0":"զոր", "1":"զօր"}, {"0":"թափոր", "1":"թափօր"}, 
        {"0":"թոշն", "1":"թօշն"}, {"0":"խոս", "1":"խօս"}, 
        {"0":"կրոն", "1":"կրօն"},  {"0":"հոտ", "1":"հօտ"}, 
        {"0":"ճոճ", "1":"ճօճ"}, {"0":"մոտ", "1":"մօտ"}, 
        {"0":"տոն", "1":"տօն"},
        {"0":"օրոր", "1":"օրօր"}, {"0":"առոտ", "1":"առօտ"}, {"0":"ոք", "1":"օք"},  {"0":"ոնք", "1":"օնք"}, {"0":"եոք", "1":"եօք"}, 
        {"0":"անեծք", "1":"անէծք"},{"0":"լեգեոն", "1":"լեգէոն"}, {"0":"կուզեկուզ", "1":"կուզէկուզ"}, {"0":"պանթեոն", "1":"պանթէոն"},  {"0":"ախպեր", "1":"ախպէր"}, {"0":"քրեական", "1":"քրէական"}, 
        {"0":"չեզոք", "1":"չէզոք"},  {"0":"պետք", "1":"պէտք"}, {"0":"հրեա", "1":"հրէայ"}, {"0":"պարետ", "1":"պարէտ"}, {"0":"քարտեզ", "1":"քարտէզ"}, {"0":"շեջ", "1":"շէջ"}, {"0":"պարտեզ", "1":"պարտէզ"}, 
        {"0":"ընկեց", "1":"ընկէց"}, {"0":"ժետ", "1":"ժէտ"}, {"0":"կեզ", "1":"կէզ"},{"0":"կես", "1":"կէս"}, {"0":"հանդես", "1":"հանդէս"}, {"0":"հրավեր", "1":"հրավէր"},{"0":"եիր", "1":"էիր"}, {"0":"եիք", "1":"էիք"}, 
        {"0":"եոս", "1":"էոս"}, {"0":"եաս", "1":"էաս"}, 
        {"0":"ակոս", "1":"ակօս"}, {"0":"աղորիք", "1":"աղօրիք"}, {"0":"ամոթ", "1":"ամօթ"}, {"0":"ապարոշ", "1":"ապարօշ"},  {"0":"արտոնյալ", "1":"արտօնեալ"}, {"0":"արտոսր", "1":"արտօսր"}, 
        {"0":"բռնազբոսիկ", "1":"բռնազբօսիկ"}, {"0":"բոթ", "1":"բօթ"}, {"0":"գոշ", "1":"գօշ"}, {"0":"գոս", "1":"գօս"}, {"0":"գոտի", "1":"գօտի"}, {"0":"դոդոշ", "1":"դօդօշ"}, 
        {"0":"զոշաքաղ", "1":"զօշաքաղ"}, {"0":"թոթափ", "1":"թօթափ"}, {"0":"թոն", "1":"թօն"}, {"0":"թոթվել", "1":"թօթուել"}, {"0":"լոթի", "1":"լօթի"}, {"0":"լոլիկ", "1":"լօլիկ"}, {"0":"խոլ", "1":"խօլ"}, 
        {"0":"ծանոթ", "1":"ծանօթ"}, {"0":"ծղոտ", "1":"ծղօտ"}, {"0":"ծնոտ", "1":"ծնօտ"}, {"0":"կարոտ", "1":"կարօտ"}, {"0":"կոշիկ", "1":"կօշիկ"}, {"0":"համառոտ", "1":"համառօտ"}, {"0":"հետազոտ", "1":"հետազօտ"},
        {"0":"ձոն", "1":"ձօն"}, {"0":"ղողանջ", "1":"ղօղանջ"}, {"0":"մոր", "1":"մօր"}, {"0":"յոդ", "1":"յօդ"}, {"0":"հոժար", "1":"յօժար"}, 
        {"0":"հոնք", "1":"յօնք"}, {"0":"հոշոտել", "1":"յօշոտել"}, {"0":"հորանջ", "1":"յօրանջ"}, {"0":"հորին", "1":"յօրին"}, {"0":"նարոտ", "1":"նարօտ"}, {"0":"պաշտոն", "1":"պաշտօն"}, {"0":"պռոշ", "1":"պռօշ"}, 
        {"0":"սոլ", "1":"սօլ"}, {"0":"սոսի", "1":"սօսի"}, {"0":"սոսափ", "1":"սօսափ"}, {"0":"վառոդ", "1":"վառօդ"}, {"0":"տոթ", "1":"տօթ"}, {"0":"քող", "1":"քօղ"},{"0":"հայացք", "1":"հայեացք"}, {"0":"Գայանե", "1":"Գայեանէ"}, {"0":"դայակ", "1":"դայեակ"}, 
    ];
        
    function replaceInDom(element, exeptions, filters, callback, attributes){
        if(typeof(filters) === 'object' && filters != null){
            for(var filter in filters){
                var attrs = filters[filter];
                var findedElements = element.getElementsByTagName(filter);
                for(var i = 0; i < findedElements.length; i++){
                    var findedElement = findedElements[i];
                    replaceInDomTreed(findedElement, exeptions, undefined, callback, attrs);
                }
            }
            return;
        }
        if(typeof(attributes) === 'object' && attributes !== null){
            if(typeof(element.attributes) !== 'undefined'){
                for(var attribute in attributes){
                    if(attribute[0] == '$'){
                        continue;
                    }
                    var elementAttribute = element.attributes[attribute];
                    if(typeof(elementAttribute) === 'undefined' || !isInArray(elementAttribute.value, attributes[attribute])){
                        return;
                    }
                }
            }
            else if(typeof(attributes['$function']) === 'undefined'){
                return;
            }
            if(typeof(attributes['$function']) === 'function') {
                if(!attributes['$function'](element)) {
                    return;
                }
            }
        }
        var title = element.getAttribute('title');
        var alt = element.getAttribute('alt');
        var value = element.value;
        if(title != null) element.setAttribute('title', callback(title));
        if(alt != null) element.setAttribute('alt', callback(alt));
        if(typeof(value) === 'string') element.value = replace(element.value, exeptions, callback);
        
        if(element instanceof HTMLIFrameElement){
            try{
                var doc = element.contentDocument || element.contentWindow.document;
                if(doc != undefined){
                    replaceInDomTreed(doc.getElementsByTagName('body')[0], exeptions, undefined, callback);
                }
            }
            catch(e){}
            return;
        }
        
        if(!(element instanceof HTMLTextAreaElement)){
            for(var i = 0; i < element.childNodes.length; i++){
                node = element.childNodes[i];
                if(node instanceof Text){
                    if(typeof(exeptions) === 'object'){
                        node.data = replace(node.data, exeptions, callback);
                    }
                    else{
                        node.data = callback(node.data);
                    }
                }
                else if(!(node instanceof Comment)){
                    replaceInDomTreed(node, exeptions, undefined, callback);
                }
            }
        }
    };
    function replaceInDomTreed(element, exeptions, filters, callback, attributes){
        setTimeout(function(){
            replaceInDom(element, exeptions, filters, callback, attributes)
        },0);
    }
    function isInArray(needle, haystack){
        needle = needle.toLowerCase();
        for(var key in haystack){
            var val = haystack[key].toLowerCase();
            if(val == needle){
                return true;
            }
            return true;
        }
        return false;
    }
    function replace(text, exeptions, callback){
        if(!(typeof exeptions === 'object') || !exeptions.length){
            return callback(text);
        }
        var footnotes = [];
        for(var j = 0; j < exeptions.length; j++){
            regexp = new RegExp(exeptions[j], 'gm');
            var matches = text.match(regexp);
            if(matches !== null){
                for(var k = 0; k < matches.length; k++){
                    text = text.replace(matches[k], '#' + j + '#' +k + '#');
                }
                exeptions.push(exeptions[j]);
            }
            footnotes[j] = matches;
        }
        text = callback(text);
        if(footnotes.length){
            for(var j = footnotes.length; j > 0; j--){
                if(footnotes[j] != null) {
                    for(var k = 0; k < footnotes[j].length; k++){
                        //text = text.replace('#' + j + '#' + k + '#', footnotes[j][k]);
                    }
                }
            }
        }
        return text;
    };
    function sovietToMashtots(element, exeptions, filters){
        replaceInDom(element, exeptions, filters, function(text){
            var i, regExp, replacment, exp;
            /* Բառերի մասեր */
            for(i in wordsParts){ 
                regExp = new RegExp(wordsParts[i][0], "g");
                text = text.replace(regExp, wordsParts[i][1]); 
            }    
            /* Հիմնական ձևափոխություններ */
            for(i in data){
                regExp = new RegExp(data[i][0], "g");
                text = text.replace(regExp, data[i][1]);
            }
            /* Սխալների ուղղում */
            for(i in errorCorrectionSovietToMashtots){ 
                exp = "(" + beginningOfWord + ")";
                exp += errorCorrectionSovietToMashtots[i][0];
                exp += "(" + endOfWord + ")";
                replacment = "$1" + errorCorrectionSovietToMashtots[i][1] + "$2";
                regExp = new RegExp(exp, "g");
                text = text.replace(regExp, replacment); 
            }     
            /* Սխալների ուղղում բառերում */
            for(i in errorCorrectionSovietToMashtotsInTheWord){ 
                exp = errorCorrectionSovietToMashtotsInTheWord[i][0];
                replacment = errorCorrectionSovietToMashtotsInTheWord[i][1];
                regExp = new RegExp(exp, "g");
                text = text.replace(regExp, replacment); 
            }
            return text;
        });
    };
    /*
    Note: the reverse conversion is done in reverse order 
    because some rules applied in chain cause unwanted
    side-effect, so order matters, and it needs to be 
    reversed in the reverse conversion
    */
    function mashtotsToSoviet(element, exeptions, filters){
        replaceInDom(element, exeptions, filters, function(text){
            var i, k, regExp, replacment, exp;
            /* Բառերի մասեր */
            for(i in wordsParts){
                regExp = new RegExp(wordsParts[i][1], "g");
                text = text.replace(regExp, wordsParts[i][0]);
            }
            /* Հիմնական ձևափոխություններ */
            k = data.length - 1;
            for(i in data){
                regExp = new RegExp(data[k-i][2], "g");
                text = text.replace(regExp, data[k-i][3]);
            }
            /* Սխալների ուղղում */
            for(i in errorCorrectionMashtotsToSoviet){
                exp = "(" + beginningOfWord + ")";
                exp += errorCorrectionMashtotsToSoviet[i][0];
                exp += "(" + endOfWord+  ")";
                replacment = "$1" + errorCorrectionMashtotsToSoviet[i][1] + "$2";
                regExp = new RegExp(exp, "g");
                text = text.replace(regExp, replacment);
            }
            /* Սխալների ուղղում բառերում */
            for(i in errorCorrectionMashtotsToSovietInTheWord){
                exp = errorCorrectionMashtotsToSovietInTheWord[i][1];
                replacment = errorCorrectionMashtotsToSovietInTheWord[i][0];
                regExp = new RegExp(exp, "g");
                text = text.replace(regExp, replacment);
            }
            return text;
        });
    }
    /*
     * Հասանելի մեթոդները 
     */
    window.mashtots = {
        sovietToMashtots: sovietToMashtots,
        mashtotsToSoviet: mashtotsToSoviet
    }
})(window);