<<<<<<< HEAD
1.ΕΓΚΑΤΆΣΤΑΣΗ
Για την εγκατάσταση της εφαρμογής θα χρειαστείται να έχετε εγκατεστημένο στο μηχάνημά σας λογισμικό WAMP ή XAMPP.
Προτείνουμε XAMPP σε περιβάλλον linux καθώς το WAMP σε περιβάλλον Windows δεν είχε την αναμενόμενη συμπεριφορά.(τουλάχιστον στα δικά μας μηχανήματα)
Τοποθετήστε όλα τα αρχεία του Git της ομάδας μας στον φάκελο που η εφαρμογή σας χρησιμοποιεί για την εγκατάσταση των ιστοσελιδών.Για παράδειγμα
η εφαρμογή XAMPP αε περιβάλλον linux χρησιμοποιεί τον φάκελο /opt/lampp/htdocs. Αν έχετε και άλλες εγκατεστημένες εφαρμογές ή σελίδες στο μηχάνημα σας
και δεν θέλετε να αναμιχθούν, προτείνουμε να δημιουργήσετε σε αυτό τον φάκελο έναν υποφάκελο με το όνομα TaxiJOIN και να αντιγράψετε εκεί μέσα ολα τα αρχεία
και τους φακέλους που θα βρείτε στο Git της ομάδας μας στην μορφή που είναι και χωρίς να αλλάξετε τα ονόματα.
Πληκτρολογήστε στον browser σας "localhost/phpmyadmin". Θα μεταφερθείτε σε περιβάλλον διαχείρησης βάσεων δεδομένων του υπολογιστή σας. Στο πάνω μέρος της
οθόνης σας επιλέξτε " Κώδικας SQL". Αντιγράψτε την πρώτη εντολή από το αρχεί DataBase.sql του git, επικολήστε το στον editor που υπάρχει στην οθόνη σας
και επιλέξτε εκτέλεση. Τώρα πρέπει να έχει δημιουργηθεί μία βάση δεδομένων με το όνομα taxijoin. Βρείτε την στο αριστερό μέρος του browser σας και επιλέξτε την.
Επιλέξτε ξανά στο πάνω μέρος του browser σας "Κώδικας SQL". Επικολήστε και εκτελέστε μία μία και τις επόμενες εντολές του αρχείου DataBase.sql.
Θα δημιουργηθεί ένας πίνακας με όνομα users που θα αποθηκεύονται εκεί τα στοιχεία των χρηστών που θα κάνουν εγγραφή στην εφαρμογή, ένας πίνακας με όνομα
connected που θα αποθηκεύει τα ονόματα των χρηστών που είναι συνδεδεμένοι στην εφαρμογή, και ένας πίνακας με όνομα requests που θα αποθηκεύει τις ενεργές αιτήσεις
που υπάρχουν κάθε στιγμή στο σύστημα.Θα δημιουργηθεί επίσης και μία εγγραφή στον πίνακα users με όνομα και κωδικό admin που αντιστοιχεί σε διαχειριστή(δεν θα μας
χρειαστεί σε αυτή την έκδοση της εφαρμογής). Επίσης σε κάθε εγγραφή χρήστη που θα γίνεται, θα δημιουργείται αυτόματα από το σύστημα ένας ακόμα πίνακας με όνομα
το username του εγγραφόμενου χρήστη που θα περιέχει πεδίο για τα ονόματα των φίλων του χρήστη(δεν θα χρειαστεί σε αυτή την έκδοση  της εφαρμογής).

Ενεργοποιείστε τον server (για XAMPP σε περιβάλλονlinux με την εντολή sudo opt/lampp/lampp start) και για να εισέρθετε στην εφαρμογή, πληκτρολογήστε σε έναν
οποιονδήποτε browser "localhost/TaxiJOIN αν τοποθετήσατε¨τα αρχεία της εφαρμογής σε υποφάκελο TaxiJOIN ή απλά localhost αν αντιγράψατε τα αρχεία απευθείας 
μέσα στον φάκελο htdocs.Για να έχετε πρόσβαση στην εφαρμογή από κάποια άλλη συσκευή (στο ίδιο δίκτυο με αυτή τη συσκευή που έχετε εγκαταστήσει την εφαρμογή),
βρείτε την ip της συσκευής που έχετε εγκαταστήσει την εφαρμογή και πληκτρολογήστε την στον browser της συσκευής με την οποία θέλετε να συνδεθείτε 
ακολουθούμενη από /TaxiJOIN.


2.ΧΡΉΣΗ ΕΦΑΡΜΟΓΉΣ
Ακολουθώντας τα παραπάνω βήματα πλέον θα πρέπει να βρίσκεστε στην εισαγωγική σελίδα της εφαρμογής(το αρχείο για αυτή την σελίδα είναι το index.html επειδή
συνήθως οι serves όπως ο Apache που χρησιμοποιεί η ομάδα μας μεταφέρει τον χρήστη στην σελίδα με όνομα index). Επιλέξτε εγγραφή και εισάγετε username τέτοιο
ώστε να εμφανιστεί στην δεξιά πλευρά η ένδειξη ΟΚ (ένδειξη ότι αυτό το username δεν χρησιμοποιείται ήδη), μετά επιλέξτε password και πληκτρολογήστε ξανά αυτό
το password ακριβώς από κάτω μέχρι να ενεργοποιηθεί και εκεί η ένδειξη ΟΚ (ένδειξη ότι τα passwords ταιριάζουν). Στην συνέχεια θα ενεργοποιηθεί και το πλήκτρο
SignUp. Επιλέξτε το και θα μεταφερθείτε στην σελίδα εισόδου (login.html). Αν θέλετε να επιβεβαιώσετε ότι η εγγραφή έγινε με επιτυχία, ελέγξτε αν στην βάση
δεδομένων έχει δημιουργηθεί πίνακας με όνομα το username που επιλέξατε και αν στον πίνακα users έχει δημιουργηθεί εγγραφή με τα στειχεία που δώσατε. Αν τα
παραπάνω έχουν γίνει όπως αναμενόταν, τότε θα έχετε την δυνατότητα να συνδεθείτε. Προτείνουμε για τον καλύτερο έλεγχο των υλοποιημένων δυνατοτήτων της εφαρμογής
να δημιουργήσετε έναν ακόμα λογαριασμό με διαφορετικά στοιχεία χρησιμοποιώντας την παραπάνω διαδικασία και να σύνδεθείτε και στους δύο ταυτόχρονα από
διαφορετικές συσκευές στο ίδιο δίκτυο(δεν θα δουλέψει από διαφορετικά παράθυρα του ίδιου browser και δεν είμαστε σίγουροι αν θα δουλέψει με δύο διαφορετικούς
browsers στην ίδια συσκευή, γιαυτό προτείνουμε να χρησιμοποιήσετε δύο διαφορετικές συσκευές συνδεδεμένες στο ίδιο δύκτιο).

Εισάγοντας τα στοιχεία σας και εκτελώντας είσοδο, θα μεταφερθείτε στην αρχική σελίδα του λογαριασμού σας. Εκεί θα υπάρχει ένα πλήκτρο με το όνομα "Αποσύνδεση"
το οποίο μπορείτε να το χρησιμοποιήσετε οποιαδήποτε στιγμή θελήσετε για να αποσυνδεθείτε και να μεταφερθείτε ξανά στην σελίδα εισόδου (login.html).
Στην σελίδα επίσης υπάρχει ένας χάρτης στον οποίο μπορείτε να δείτε όλες τις ενεργές αιτήσεις που υπαρχουν κάθε στιγμή. Για να δημιουργήσετε μία αίτηση,
πατήστε σε ένα σημείο του χάρτη που θα είναι το σημείο που βρίσκεστε. Το σύστημα θα εκτελέσει έλεγχο αν στην περιοχή υπάρχουν άλλες ενεργές αιτήσεις.
Αν δεν υπαρχουν θα σας εμφανίσει μήνυμα σφάλματος και θα σας προτρέψε να δημιουργήσετε μία δική σας αίτηση πατώντας στον χάρτη για να δείξετε το σημείο
προορισμού. Πλέον θα έχετε δημιουργήσει δύο σημεία στον χάρτη που θα αντιπροσωπεύουν το σημείο εκκίνησης και προορισμού σας. Ακόμα όμως η αίτηση σας
δεν έχει δημιουργηθεί.Το σύστημα θα σας ζητήσει να δώσετε τον αριθμό των ατόμων με το οπία βρίσκεστε μαζί (μαζί με τον εαυτό σας) δηλαδή 1 έως 3
και στην συνέχεια θα εμφανίσει ένα πλήκτρο με την ένδειξη "Create". Αν επιλέξετε αυτό τον πλήκτρο, το συστημα θα δημιουργήσει μία εγγραφή στον πίνακα
requests και θα εμφανίσει στον χάρτη κάθε συνδεδεμένου χρήστη το σημείο εκκίνησης σας με πληροφορίες για την αίτηση σας. Ο χάρτης κάθε χρήστη ανανεώνεται
κάθε λίγα δευτερόλεπτα (5 δευτερόλεπτα στην αρχική έκδοση της εφαρμογής). Οποιαδήποτε στιγμή επιθυμείτε μπορείτε να επιλέξετε το πλήκτρο "Cancel" 
και να ακυρώσετε την διαδικασία. Αν έχετε ήδη δημιουργήσει την αίτηση και πατήσετε το πλήκτρο "Cancel" τότε το σύστημα θα διαγράψει την αίτηση απο
την βάση δεδομένων αλλά και απο τον χάρτη κάθε συνδεδεμένου χρήστη.

Στον χάρτη υπάρχουν τα σημεία εκκίνησης όλων των ενεργών αιτήσεων που υπάρχουν εκείνη την στιγμή.Πατώντας πάνω σε μία από αυτές εμφανίζεται ένας νέος χάρτης
ο οποίος περιέχει και το σημείο εκκίνησης και το σημείο προορισμού. Παράλληλα στον αρχικό χάρτη, εμφανίζεται ένα popup που αναγράφεται το username του
δημιουργού της αίτησης καθώς και το πλήθος τον συμμετεχόντων. Τέλος θα εμφανιστούν στην οθόνη ακόμη 2 πλήκτρα, το Connect και το Close. Πατώντας το Close 
ο χάρτης θα εξαφανίζεται και θα μπορείτε να επιλέξετε άλλη αίτηση για προεπισκόπηση. Πατώντας το Connect θα εισέρχεστε σε chat με τους υπόλοιπους
συμμετέχοντες της αίτησης.(δεν έχει υλοποιηθεί)
