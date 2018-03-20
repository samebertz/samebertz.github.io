<?php
header("Content-type: text/html; charset=utf-8");
if(isset($_POST['rule'])) {
    stuff();
} else {
?>
<form action="?stuff" method="post">
    <label for="POST-rule">Rule:</label>
    <input id="POST-rule" type="number" min="0" max="255" name="rule" placeholder="Rule number in decimal" style="width:200px;">
    <input type="submit">
</form>
<?php
}
function stuff() {
    $rule_i = str_split(correct_rule(decbin($_POST['rule'])));
    $rule = array();
    $curr = array();
    for($c=0, $b=7; $c<8 && $b>=0; $c++, $b--) {
        if(isset($rule_i[$c])) {
            $rule[correct(decbin($b))] = $rule_i[$c];
        } else {
            $rule[correct(decbin($b))] = 0;
        }
    }
    for($c=0; $c<101; $c++) {
        if($c == 50) {
            $curr[$c] = 1;
        } else {
            $curr[$c] = 0;
        }
    }
    $prev = $curr;
    print_line($curr);
    for($x=0; $x<49;$x++) {
        for($c=1; $c<100; $c++) {
            $str = $prev[$c-1].$prev[$c].$prev[$c+1];
            $curr[$c] = $rule[$str];
        }
        $prev = $curr;
        print_line($curr);
    }
    unset($_POST['rule']);
    if(isset($_POST['rule'])) {
        echo "<br><br>STILL SET<br><br>";
    }
}
function print_line($array) {
    $str = "";
    foreach ($array as $value) {
        if($value == 0) {
            $str .= "&#9617";
        } else {
            $str .= "&#9619";
        }
    }
    echo $str."<br>";
}
function correct($str) {
    while(strlen($str) < 3) {
        $str = 0 . $str;
    }
    return $str;
}
function correct_rule($str) {
    while(strlen($str) < 8) {
        $str = 0 . $str;
    }
    return $str;
}
?>
