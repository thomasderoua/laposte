<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if (isset($_SESSION['id'])) {
        echo '<p class="error">Tu es déjà connecté.</p>';
        exit();
    }
?>
<h1>Connexion</h1>

<?php
    echoMessage();
?>

<form action="" method="POST">
    <label class="options-label" for=""><strong class="required">*</strong> Mail</label>
    <input class="options-input" type="text" name="login" value="">

    <label class="options-label" for=""><strong class="required">*</strong> Mot de passe</label>
    <input class="options-input" type="password" name="password">
    <button type="submit">Login</button> | <a href="">S'inscrire</a>
</form>