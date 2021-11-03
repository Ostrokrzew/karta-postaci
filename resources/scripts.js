function load_max(what_id, max_id) {
    document.getElementById(what_id).innerText = parseInt(document.getElementById(max_id).innerText);
}

function load_max_hp() {
    document.getElementById('max-hp').innerText = parseInt(document.getElementById('stamina').innerText) + parseInt(document.getElementById('physique').innerText);
    load_max("hp", "max-hp");
}

function load_max_mana() {
    load_max("mana", "max-mana");
}

function save_to_cache() {
    const data_info = (
        {
            "name": document.getElementById("name").innerText,
            "race": document.getElementById("race").innerText,
            "profession": document.getElementById("profession").innerText,
            "biography": document.getElementById("biography").innerText,
            "max-hp": document.getElementById("max-hp").innerText,
            "max-mana": document.getElementById("max-mana").innerText
        }
        );
    localStorage.setItem("data", JSON.stringify(data_info));
    console.log("data saved");
}

function load_from_cache() {
    const json_obj = JSON.parse(localStorage.getItem("data"));
    for (const id in json_obj) {
        document.getElementById(id).innerText = json_obj[id];
    }
    console.log("data loaded");
}

async function save_changes(changes_json) {
    let module = await import('https://cdn.skypack.dev/@octokit/rest');
    let info_text = JSON.stringify(changes_json);
    let token = prompt('Enter GitHub access token');
    const octokit = new module.Octokit({auth: token});

    let ref_response = await octokit.request('GET /repos/Ostrokrzew/karta-postaci/git/ref/heads/after-game', {
        owner: 'Ostrokrzew',
        repo: 'karta-postaci',
        ref: 'heads/after-game',
    });
    console.log(ref_response);

    let last_commit_response = await octokit.request('GET ' + ref_response.data.url, {
        owner: 'Ostrokrzew',
        repo: 'karta-postaci',
        commit_sha: ref_response.data.object.sha,
    });
    console.log(last_commit_response);

    let head_response = await octokit.request('GET ' + last_commit_response.data.object.url + '?recursive=1', {
        owner: 'Ostrokrzew',
        repo: 'karta-postaci',
        content: info_text,
    });
    console.log(head_response);

    let blob_response = await octokit.request('POST /repos/Ostrokrzew/karta-postaci/git/blobs', {
        owner: 'Ostrokrzew',
        repo: 'karta-postaci',
        content: info_text,
    });
    console.log(blob_response);

    let tree_response = await octokit.request('POST /repos/Ostrokrzew/karta-postaci/git/trees', {
        owner: 'Ostrokrzew',
        repo: 'karta-postaci',
        base_tree: head_response.data.tree.sha,
        tree: [{
            path: 'resources/info.json',
            mode: '100644',
            type: 'blob',
            content: info_text
        }],
        author: {name: 'Ostrokrzew', email: 'ostrokrzew@protonmail.com'}
    });
    console.log(tree_response);

    let new_commit_response = await octokit.request('POST /repos/Ostrokrzew/karta-postaci/git/commits', {
        owner: 'Ostrokrzew',
        repo: 'karta-postaci',
        message: 'commit after game',
        parents: [head_response.data.sha],
        tree: tree_response.data.sha,
        author: {name: 'Ostrokrzew', email: 'ostrokrzew@protonmail.com'}
    });
    console.log(new_commit_response);

    let ref_update_response = await octokit.request('PATCH /repos/Ostrokrzew/karta-postaci/git/refs/heads/after-game', {
        owner: 'Ostrokrzew',
        repo: 'karta-postaci',
        ref: 'heads/after-game',
        sha: new_commit_response.data.sha,
    });
    console.log(ref_update_response);

    let pr_response = await octokit.request('POST /repos/Ostrokrzew/karta-postaci/pulls', {
        owner: 'Ostrokrzew',
        repo: 'karta-postaci',
        title: 'After game',
        head: 'after-game',
        base: 'master',
    });
    console.log(pr_response);
}

function load_all() {
    load_max_hp();
    load_max_mana();
    load_from_cache();
    let changes_json = JSON.parse('{ \
        "name": "Miono: Ifigeniô", \
        "race": "Rasa: Bòrówcka z Ôstu", \
        "profession": "Wark: Mniszka", \
        "biography": "Plac na biografiã", \
        "max-hp": "10", \
        "max-mana": "10", \
        "physique": "5" \
        }');
    save_changes(changes_json);
}

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
    colorize("hp", "max-hp");
}

function colorize_mana() {
    colorize("mana", "max-mana");
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
    change_up_down("hp", "max-hp", up);
    colorize_hp();
}

function change_mana(up) {
    change_up_down("mana", "max-mana", up);
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
    let dmg_dices = document.getElementById("max-damage").innerText.split("k");
    let dices_number, dmg_points, dices_points, modifier, dmg = 0;

    dices_number = parseInt(dmg_dices[0]);

    if (dmg_dices[1].includes("+")) {
        dmg_points = dmg_dices[1].split("+");
        dices_points = parseInt(dmg_points[0]);
        modifier = parseInt(dmg_points[1]);
    } else {
        dices_points = parseInt(dmg_dices[1]);
        modifier = 0;
    }

    for (let i = 0; i < dices_number; i++) {
        dmg += parseInt(throw_dice(dices_points));
    }

    document.getElementById("damage").innerText = dmg + modifier;
}

function cast_spell(spell_button_id, mana_cost_id) {
    if (parseInt(document.getElementById(mana_cost_id).innerText) <= parseInt(document.getElementById("mana").innerText)) {
        document.getElementById(spell_button_id).innerText = "Czarzënié"
        document.getElementById("mana").innerText = parseInt(document.getElementById("mana").innerText) - 5;
    } else {
        document.getElementById(spell_button_id).innerText = "Felëje Cë pùńktów mòcë!";
    }
}
