function load_max(what_id, max_id) {
    document.getElementById(what_id).innerText = parseInt(document.getElementById(max_id).innerText);
}

function calculate_max_hp() {
    document.getElementById('max-hp').innerText = parseInt(document.getElementById('stamina').innerText) + parseInt(document.getElementById('physique').innerText);
}

function recalculate_hp() {
    calculate_max_hp();
    if (parseInt(document.getElementById('hp').innerText) > parseInt(document.getElementById('max-hp').innerText)) {
        load_max("hp", "max-hp");
    }
}

function load_hp() {
    calculate_max_hp();
    load_max("hp", "max-hp");
}

function load_mana() {
    load_max("mana", "max-mana");
}

function current_data() {
    const data = {
        // info
        "name": document.getElementById("name").innerText,
        "race": document.getElementById("race").innerText,
        "profession": document.getElementById("profession").innerText,
        "biography": document.getElementById("biography").innerText,
        // image
        "portrait": document.getElementById("portrait").src,
        "portrait_big": document.getElementById("portrait_big").href,
        // main stats
        "max-hp": document.getElementById("max-hp").innerText,
        "max-mana": document.getElementById("max-mana").innerText,
        "physique": document.getElementById("physique").innerText,
        "strength": document.getElementById("strength").innerText,
        "stamina": document.getElementById("stamina").innerText,
        "speed": document.getElementById("speed").innerText,
        "intelligence": document.getElementById("intelligence").innerText,
        "dexterity": document.getElementById("dexterity").innerText,
        "sober-mind": document.getElementById("sober-mind").innerText,
        // combat
        "attack": document.getElementById("attack").innerText,
        "defence": document.getElementById("defence").innerText,
        "known-weapon-level": document.getElementById("known-weapon-level").innerText,
        "weapon": document.getElementById("weapon").innerText,
        "weapon-category": document.getElementById("weapon-category").innerText,
        "weapon-damage": document.getElementById("weapon-damage").innerText
    }
    return data;
}

function current_equipment() {
    let data = {};
    for (let item of document.getElementsByClassName("item")) {
        data[item.id] = item.innerHTML;
    }

    return data;
}

function add_new_item_to_equipment() {
    let index = document.getElementsByClassName("item").length;
    let table_body = document.getElementById('equipment-items');
    let row = document.createElement("tr");
    row.id = "item_" + index;
    row.className = "item";
    let cell_id = row.id + "_amount";
    row.innerHTML = "<td style=\"text-align:left;\" contenteditable='true'></td><td id=\"" + cell_id + "\">1</td><td><button type=\"button\" onclick=\"change_amount('" + cell_id + "', 1)\">+ 1</button><button type=\"button\" onclick=\"change_amount('" + cell_id + "', 0)\">- 1</button></td><td style=\"text-align:left;\" contenteditable='true'></td>\n";

    table_body.appendChild(row);
}
function add_item_to_equipment(row_id, content) {
    let table_body = document.getElementById('equipment-items');
    let row = document.createElement("tr");
    row.id = row_id;
    row.className = "item";
    row.innerHTML = content;

    table_body.appendChild(row);
}

function current_spells() {
    let data = {};
    for (let item of document.getElementsByClassName("spell")) {
        data[item.id] = item.innerHTML;
    }
    return data;
}

function add_new_spell() {
    let index = document.getElementsByClassName("spell").length;
    let table_body = document.getElementById('magic-spells');
    let row = document.createElement("tr");
    row.id = "spell_" + index;
    row.className = "spell";
    let cost = row.id + "-cost";
    let button = row.id + "-button";

    row.innerHTML = "<td style=\"text-align:left;\" class='non-editable' contenteditable='true'></td><td id='" + cost + "'>1</td><td class=\"editor-mode\" style='display: table-cell'><button type=\"button\" onclick=\"change_amount('" + cost + "', 1)\">+ 1</button><button type=\"button\" onclick=\"change_amount('" + cost + "', 0)\">- 1</button></td><td><button type=\"button\" class='magic-button' id='" + button + "' onclick=\"cast_spell('" + button + "', '" + cost + "')\">Szmërgnij zôklãcé</button></td><td class='non-editable' contenteditable='true'>1 ruńda</td><td style=\"text-align:left;\" class='non-editable' contenteditable='true'></td>\n";

    table_body.appendChild(row);
}

function add_spell(row_id, content) {
    let table_body = document.getElementById('magic-spells');
    let row = document.createElement("tr");
    row.id = row_id;
    row.className = "spell";
    row.innerHTML = content;

    table_body.appendChild(row);
}

function current_skills() {
    let data = {};
    data['generic'] = {};
    data['detailed'] = {};
    for (let item of document.getElementsByClassName("skill_gen")) {
        data["generic"][item.id] = item.innerHTML;
    }
    for (let item of document.getElementsByClassName("skill_det")) {
        data["detailed"][item.id] = item.innerHTML;
    }
    console.log(JSON.stringify(data, null, 4));
    return data;
}

function add_new_skill(detailed) {
    let index, table_body, row_id, class_name;
    if (detailed) {
        index = document.getElementsByClassName("skill_det").length;
        table_body = document.getElementById('detailed-skills');
        class_name = 'skill_det'
        row_id = "skill_det_"
    } else {
        index = document.getElementsByClassName("skill_gen").length;
        table_body = document.getElementById('generic-skills');
        class_name = 'skill_gen'
        row_id = "skill_"
    }

    let row = document.createElement("tr");
    row.id = row_id + index;
    row.className = class_name;
    let points = row.id + "-points";
    let button = row.id + "-button";

    row.innerHTML = "<td class='non-editable' style='text-align:left;' contenteditable='true'></td><td id='" + points + "'>1</td><td class='editor-mode' style='display: table-cell'><button type='button' onclick=\"change_amount('" + points + "', 1)\">+ 1</button><button type='button' onclick=\"change_amount('" + points + "', 0)\">- 1</button></td><td><button type='button' class='big-button' id='" + button + "' onclick=\"normal_test('" + points + "', '" + button + "')\">Szmërgnij knôblã</button></td>\n";

    table_body.appendChild(row);
}

function add_skill(row_id, content, detailed) {
    let table_body, class_name;
    if (detailed) {
        table_body = document.getElementById('detailed-skills');
        class_name = 'skill_det'
    } else {
        table_body = document.getElementById('generic-skills');
        class_name = 'skill_gen'
    }

    let row = document.createElement("tr");
    row.id = row_id;
    row.className = class_name;
    row.innerHTML = content;
    console.log(row);

    table_body.appendChild(row);
}

function clear_skills() {
    
}

function save_to_cache() {
    try {
        localStorage.setItem("data", JSON.stringify(current_data(), null, 4));
        localStorage.setItem("equip", JSON.stringify(current_equipment(), null, 4));
        localStorage.setItem("spells", JSON.stringify(current_spells(), null, 4));
        localStorage.setItem("skills", JSON.stringify(current_skills(), null, 4));
        console.log("Data saved to cache");
    } catch (err) {
        console.log("Data cannot be saved. Error: " + err);
    }
}

function load_from_cache() {
    let info = localStorage.getItem("data")
    try {
        if (!info) {
            throw 'empty';
        }
    } catch (err) {
        console.log("Character data you're trying to load is " + err);
    }

    let json_obj = JSON.parse(info);
    for (const id in json_obj) {
        if (!id.includes('portrait')) {
            document.getElementById(id).innerHTML = json_obj[id];
        }
    }
    document.getElementById('portrait').src = json_obj['portrait'];
    document.getElementById('portrait_big').href = json_obj['portrait_big'];

    let equip = localStorage.getItem("equip")
    try {
        if (!equip) {
            throw 'empty';
        }
    } catch (err) {
        console.log("Equipment data you're trying to load is " + err);
    }

    json_obj = JSON.parse(equip);
    for (const id in json_obj) {
        add_item_to_equipment(id, json_obj[id]);
    }

    let spells = localStorage.getItem("spells")
    try {
        if (!spells) {
            throw 'empty';
        }
    } catch (err) {
        console.log("Spells data you're trying to load is " + err);
    }

    json_obj = JSON.parse(spells);

    for (const id in json_obj) {
        add_spell(id, json_obj[id]);
    }

    let skills = localStorage.getItem("skills")
    try {
        if (!skills) {
            throw 'empty';
        }
    } catch (err) {
        console.log("Skills data you're trying to load is " + err);
    }

    json_obj = JSON.parse(skills);

    for (const id in json_obj['generic']) {
        add_skill(id, json_obj['generic'][id], false);
    }
    for (const id in json_obj['detailed']) {
        add_skill(id, json_obj['detailed'][id], true);
    }

    console.log("Cached data loaded.");
}

function enter_editor_mode() {
    let password = localStorage.getItem('password');
    if (!password) {
        password = prompt('Enter password');
    }
    // dummy line of defence against children
    if (password == 'dupa') {
        localStorage.setItem('password', password);

        let editor_class = document.getElementsByClassName("editor-mode");
        for (const item of editor_class) {
            item.style.display = "table-cell";
        }
        editor_class = document.getElementsByClassName("editor-mode-button");
        for (const item of editor_class) {
            item.style.display = "inline";
        }
        editor_class = document.getElementsByClassName('non-editable')
        for (let spell of editor_class) {
            spell.contentEditable = true;
        }

        document.getElementById("biography").contentEditable = true;
        document.getElementById("biography").style.backgroundColor = "white";
        document.getElementById("edit").style.display = 'none';
        document.getElementById("leave-edit").style.display = 'inline';
    }
    else {
        throw 'Wrong password';
    }
}

function leave_editor_mode() {
    let editor_class = document.getElementsByClassName("editor-mode");
    for (const item of editor_class) {
        item.style.display = "none";
    }
    editor_class = document.getElementsByClassName("editor-mode-button");
    for (const item of editor_class) {
        item.style.display = "none";
    }
    editor_class = document.getElementsByClassName('non-editable');
    for (const item of editor_class) {
        item.contenteditable = false;
    }

    document.getElementById("biography").contentEditable = false;
    document.getElementById("biography").style.backgroundColor = "initial";
    document.getElementById("edit").style.display = 'inline';
    document.getElementById("leave-edit").style.display = 'none';
}

async function commit_changes(changes_json, filename, make_pr = false) {
    let module = await import('https://cdn.skypack.dev/@octokit/rest');

    let info_text = JSON.stringify(changes_json, null, 4);
    let token = localStorage.getItem('token');
    if (!token) {
        token = prompt('Enter GitHub access token');
        localStorage.setItem('token', token);
    }

    const octokit = new module.Octokit({auth: token});

    // get current head
    let ref_response = await octokit.request('GET /repos/Ostrokrzew/karta-postaci/git/ref/heads/after-game', {
        owner: 'Ostrokrzew',
        repo: 'karta-postaci',
        ref: 'heads/after-game',
    });
    console.log(ref_response);

    // get head's commit hash
    let last_commit_response = await octokit.request('GET ' + ref_response.data.url, {
        owner: 'Ostrokrzew',
        repo: 'karta-postaci',
        commit_sha: ref_response.data.object.sha,
    });
    console.log(last_commit_response);

    // get more detailed info about head's last commit
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
            path: 'data/'+ filename,
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

    if (make_pr) {
        let pr_response = await octokit.request('POST /repos/Ostrokrzew/karta-postaci/pulls', {
            owner: 'Ostrokrzew',
            repo: 'karta-postaci',
            title: 'After game ' + Date.now(),
            head: 'after-game',
            base: 'master',
        });
        console.log(pr_response);
    }
}

async function save() {
    await commit_changes(current_data(), 'info.json');
    await commit_changes(current_spells(), 'spells.json');
    await commit_changes(current_skills(), 'skills.json');
    await commit_changes(current_equipment(), 'equip.json', true);
}

async function load_json(filename) {
    var json = await fetch('data/'+ filename);
    var json_text = await json.text();
    try {
        if (json_text == "") {
            throw 'empty';
        }
    } catch (err) {
        console.log("Data you're trying to load is " + err);
    }

    var json_obj = await JSON.parse(json_text);
    return json_obj;
}

function load(json_obj) {
    for (const id in json_obj) {
        if (!id.includes('portrait')) {
            document.getElementById(id).innerHTML = json_obj[id];
        }
    }
    console.log("Loaded data:\n" + JSON.stringify(json_obj, null, 4));
}

function load_images(json_obj) {
    document.getElementById('portrait').src = json_obj['portrait'];
    document.getElementById('portrait_big').href = json_obj['portrait_big'];
    console.log("Images loaded");
}

function load_equipment(json_obj) {
    for (const id in json_obj) {
        add_item_to_equipment(id, json_obj[id]);
    }
    console.log("Loaded data:\n" + JSON.stringify(json_obj, null, 4));
}

function load_spells(json_obj) {
    for (const id in json_obj) {
        add_spell(id, json_obj[id]);
    }
    console.log("Loaded data:\n" + JSON.stringify(json_obj, null, 4));
}

function load_skills(json_obj) {
    for (const id in json_obj['generic']) {
        add_skill(id, json_obj['generic'][id], false);
    }
    for (const id in json_obj['detailed']) {
        add_skill(id, json_obj['detailed'][id], true);
    }
    console.log("Loaded data:\n" + JSON.stringify(json_obj, null, 4));
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

async function load_all() {
    let json_obj = await load_json('info.json');
    load(json_obj);
    load_images(json_obj);

    json_obj = await load_json('equip.json');
    load_equipment(json_obj);

    json_obj = await load_json('spells.json');
    load_spells(json_obj);

    json_obj = await load_json('skills.json');
    load_skills(json_obj);

    weapon_arithmetic();
    load_hp();
    load_mana();
}

async function init_site() {
    await load_all();
    colorize_hp();
    colorize_mana();
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
    let current_sober_mind = parseInt(document.getElementById("sober-mind").innerText);
    if (up) {
        document.getElementById("sober-mind").innerText = current_sober_mind + 1;
    } else {
        if (parseInt(document.getElementById("sober-mind").innerText) > 0)
        {
            document.getElementById("sober-mind").innerText = current_sober_mind - 1;
        }
    }
    if (current_sober_mind >= 5 && parseInt(document.getElementById("sober-mind").innerText) < 5) {
        sober_mind_arithmetic(1);
    } else if (current_sober_mind < 5 && parseInt(document.getElementById("sober-mind").innerText) >= 5) {
        sober_mind_arithmetic(0);
    }
    recalculate_hp();
}

function sober_mind_arithmetic(penalty) {
    if (penalty) {
        change_amount('physique', 0);
        change_amount('strength', 0);
        change_amount('stamina', 0);
        change_amount('speed', 0);
        change_amount('intelligence', 0);
        change_amount('dexterity', 0);
    } else {
        change_amount('physique', 1);
        change_amount('strength', 1);
        change_amount('stamina', 1);
        change_amount('speed', 1);
        change_amount('intelligence', 1);
        change_amount('dexterity', 1);
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

function change_weapon_knowledge(up) {
    if (!up || parseInt(document.getElementById('known-weapon-level').innerText) < 25) {
        change_amount('known-weapon-level', up);
    }
    weapon_arithmetic();
}

function change_weapon_category(up) {
    if ((!up || parseInt(document.getElementById('weapon-category').innerText) < 5) && (up || parseInt(document.getElementById('weapon-category').innerText) > 1)) {
        change_amount('weapon-category', up);
    }
    weapon_arithmetic();
}

function throw_dice(dice_size) {
    let array = new Uint32Array(1);
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

function normal_test(skill_id, skill_button) {
    let sum = throw_d32() + parseInt(document.getElementById(skill_id).innerText);
    document.getElementById(skill_button).innerText = sum;
    colorize_test(skill_button);
}

function penalty_test() {
    let sum = Math.min(throw_d20(), throw_d20()) + throw_d12();
    document.getElementById("no-skill-button").innerText = sum;
    colorize_test("no-skill-button");
}

function premium_test(skill_id, skill_button) {
    let sum = Math.max(throw_d20(), throw_d20()) + throw_d12() + parseInt(document.getElementById(skill_id).innerText);
    document.getElementById(skill_button).innerText = sum;
    colorize_test(skill_button);
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
    normal_test('sober-mind', 'sober-mind-button');
    document.getElementById("run-away-sm").innerText = document.getElementById("sober-mind-button").innerText;
}

function run_away_speed() {
    normal_test('speed', 'speed-button');
    document.getElementById("run-away-speed").innerText = document.getElementById("speed-button").innerText;
}

function normal_attack() {
    let modifier = 0;
    if (parseInt(document.getElementById("weapon-category").innerText) > parseInt(document.getElementById("known-weapon-category").innerText)) {
        modifier = parseInt(-document.getElementById("weapon-modifier").innerText);
    } else {
        modifier = parseInt(document.getElementById("known-weapon-modifier").innerText);
    }
    let sum = throw_d32() + parseInt(document.getElementById("attack").innerText) + modifier;
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
    normal_test('dexterity', 'dexterity-button');
    document.getElementById("counter-attack-dex").innerText = document.getElementById("dexterity-button").innerText;
}

function double_attack() {
    let modifier = 0;
    if (parseInt(document.getElementById("weapon-category").innerText) > parseInt(document.getElementById("known-weapon-category").innerText)) {
        modifier = parseInt(-document.getElementById("weapon-modifier").innerText);
    } else {
        modifier = parseInt(document.getElementById("known-weapon-modifier").innerText);
    }
    let sum = throw_d20() + parseInt(document.getElementById("attack").innerText) + modifier;
    document.getElementById("double-attack").innerText = sum;
}

function fury_attack() {
    let modifier = 0;
    if (parseInt(document.getElementById("weapon-category").innerText) > parseInt(document.getElementById("known-weapon-category").innerText)) {
        modifier = parseInt(-document.getElementById("weapon-modifier").innerText);
    } else {
        modifier = parseInt(document.getElementById("known-weapon-modifier").innerText);
    }
    let sum = throw_d32() + parseInt(document.getElementById("attack").innerText) + modifier;
    document.getElementById("fury-attack").innerText = sum;
}

function damage() {
    let dmg_dices = document.getElementById("weapon-damage").innerText.split("k");
    let dices_number, dmg_points, dices_points, modifier, dmg = 0;

    dices_number = parseInt(dmg_dices[0]);

    if (dmg_dices[1].includes("+")) {
        dmg_points = dmg_dices[1].split("+");
        dices_points = parseInt(dmg_points[0]);
        modifier = parseInt(dmg_points[1]);
    } else if (dmg_dices[1].includes("-")) {
        dmg_points = dmg_dices[1].split("-");
        dices_points = parseInt(dmg_points[0]);
        modifier = parseInt(-dmg_points[1]);
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
        document.getElementById(spell_button_id).innerText = "Felëje pùńktów mòcë!";
    }
}

function weapon_arithmetic() {
    let modifier = Math.floor(parseInt(document.getElementById("known-weapon-level").innerText) / 5);
    if (modifier == 5)
        modifier = 4;
    document.getElementById("known-weapon-modifier").innerText = '+' + modifier;
    document.getElementById("known-weapon-category").innerText = modifier + 1;
    document.getElementById("weapon-modifier").innerText = parseInt(document.getElementById("weapon-category").innerText) - 1;
}
