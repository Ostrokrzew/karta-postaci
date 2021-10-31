function load_max(what_id, max_id) {
    document.getElementById(what_id).innerText = parseInt(document.getElementById(max_id).innerText);
}

function load_max_hp() {
    load_max("hp", "max_hp");
}

function load_max_mana() {
    load_max("mana", "max_mana");
}

// function save_to_cache() {
//     localStorage.setItem("name", "Ifigeniô");
//     console.log("name saved");
// }
//
// async function load_from_cache() {
//     document.getElementById("name").innerText = "Miono: " + localStorage.getItem("name");
//     console.log("name loaded");
// }

function colorize(what_id, max_id) {
    let points = document.getElementById(what_id).innerText;
    if (points < 0.33 * parseInt(document.getElementById(max_id).innerText)) {
        document.getElementById(what_id).style.color = "red";
        document.getElementById(what_id).style.fontWeight = "bold";
    } else if (points < 0.67 * parseInt(document.getElementById(max_id).innerText)) {
        document.getElementById(what_id).style.color = "orange";
    } else {
        document.getElementById(what_id).style.color = "green";
    }
}

function colorize_hp() {
    colorize("hp", "max_hp");
}

function colorize_mana() {
    colorize("mana", "max_mana");
}

function change_up_down(what_id, max_id, up) {
    if (up) {
        if (parseInt(document.getElementById(what_id).innerText) < parseInt(document.getElementById(max_id).innerText))
        {
            document.getElementById(what_id).innerText = parseInt(document.getElementById(what_id).innerText) + 1;
        }
    } else {
        if (parseInt(document.getElementById(what_id).innerText) > 0)
        {
            document.getElementById(what_id).innerText = parseInt(document.getElementById(what_id).innerText) - 1;
        }
    }
}

function change_hp(up) {
    change_up_down("hp", "max_hp", up);
    colorize_hp();
}

function change_mana(up) {
    change_up_down("mana", "max_mana", up);
    colorize_mana();
}

function change_sober_mind(up) {
    if (up) {
        document.getElementById("sober-mind").innerText = parseInt(document.getElementById("sober-mind").innerText) + 1;
    } else {
        if (parseInt(document.getElementById("sober-mind").innerText) > 0)
        {
            document.getElementById("sober-mind").innerText = parseInt(document.getElementById("sober-mind").innerText) - 1;
        }
    }
}

function change_amount(what_id, up) {
    if (up) {
        document.getElementById(what_id).innerText = parseInt(document.getElementById(what_id).innerText) + 1;
    } else {
        if (parseInt(document.getElementById(what_id).innerText) > 0)
        {
            document.getElementById(what_id).innerText = parseInt(document.getElementById(what_id).innerText) - 1;
        }
    }
}

function throw_dice(dice_size) {
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % dice_size + 1;
}

function throw_d3(params) {
    return throw_dice(3);
}

function throw_d4(params) {
    return throw_dice(4);
}

function throw_d6(params) {
    return throw_dice(6);
}

function throw_d8(params) {
    return throw_dice(8);
}

function throw_d12(params) {
    return throw_dice(12);
}

function throw_d20(params) {
    return throw_dice(20);
}

function throw_d32(params) {
    return throw_dice(32);
}

function throw_d100(params) {
    return throw_dice(100);
}

function colorize_test(test_button_id) {
    let points = parseInt(document.getElementById(test_button_id).innerText);
    if (points < 16) {
        document.getElementById(test_button_id).style.backgroundColor = "red";
    } else if (points >= 29) {
        document.getElementById(test_button_id).style.backgroundColor = "gold";
    } else {
        document.getElementById(test_button_id).style.backgroundColor = "green";
    }
}

function normal_test(skill_id) {
    let sum = throw_d32() + parseInt(document.getElementById(skill_id).innerText);
    document.getElementById(skill_id + "-button").innerText = sum;
    colorize_test(skill_id + "-button")
}

function penalty_test() {
    let sum = Math.min(throw_d20(), throw_d20()) + throw_d12();
    document.getElementById("no-skill-button").innerText = sum;
    colorize_test("no-skill-button")
}

function premium_test(skill_id) {
    let sum = Math.max(throw_d20(), throw_d20()) + throw_d12() + parseInt(document.getElementById(skill_id).innerText);
    document.getElementById(skill_id + "-button").innerText = sum;
    colorize_test(skill_id + "-button")
}

function normal_defence() {
    let sum = throw_d32() + parseInt(document.getElementById("defence").innerText);
    document.getElementById("normal-defence").innerText = sum;
}

function weak_defence() {
    let sum = throw_d20() + parseInt(document.getElementById("defence").innerText);
    document.getElementById("weak-defence").innerText = sum;
}

function very_weak_defence() {
    let sum = throw_d12() + parseInt(document.getElementById("defence").innerText);
    document.getElementById("very-weak-defence").innerText = sum;
}

function run_away_sm() {
    normal_test('sober-mind');
    document.getElementById("run-away-sm").innerText = document.getElementById("sober-mind-button").innerText;
}

function run_away_speed() {
    normal_test('speed');
    document.getElementById("run-away-speed").innerText = document.getElementById("speed-button").innerText;
}

function normal_attack() {
    let sum = throw_d32() + parseInt(document.getElementById("attack").innerText) + parseInt(document.getElementById("known-weapon-modificator").innerText);
    document.getElementById("normal-attack").innerText = sum;
}

function counter_attack_off() {
    normal_attack();
    document.getElementById("counter-attack-off").innerText = document.getElementById("normal-attack").innerText;
}

function counter_attack_def() {
    normal_defence();
    document.getElementById("counter-attack-def").innerText = document.getElementById("normal-defence").innerText;
}

function counter_attack_dex() {
    normal_test('dexterity');
    document.getElementById("counter-attack-dex").innerText = document.getElementById("dexterity-button").innerText;
}

function double_attack() {
    let sum = throw_d20() + parseInt(document.getElementById("attack").innerText) + parseInt(document.getElementById("known-weapon-modificator").innerText);
    document.getElementById("double-attack").innerText = sum;
}

function fury_attack() {
    let sum = throw_d32() + parseInt(document.getElementById("attack").innerText) + parseInt(document.getElementById("known-weapon-modificator").innerText);
    document.getElementById("fury-attack").innerText = sum;
}

function damage() {
    let dmg_dices = document.getElementById("max-damage").innerText.split('k');
    let dices_number, dices_points, modifier, dmg;

    dices_number = parseInt(dmg_dices[0]);

    if (dmg_dices[1].includes('+')) {
        var dmg_points = dmg_dices[1].split('+');
        dices_points = parseInt(dmg_points[0]);
        modifier = parseInt(dmg_points[1]);
    } else {
        dices_points = parseInt(dmg_dices[1]);
        modifier = 0;
    }

    for (let i = 0; i < dices_number; i++) {
        dmg += throw_dice(dices_points);
    }

    document.getElementById("max-damage").innerText = dmg + modifier;
}

function cast_spell(what_id, mana_cost) {

}
