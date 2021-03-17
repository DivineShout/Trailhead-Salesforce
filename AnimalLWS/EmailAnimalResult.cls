public class EmailAnimalResult {

    public static void sendMail(String address, String subject, String body) {

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {address};
        mail.setToAddresses(toAddresses);
        mail.setSubject(subject);
        mail.setPlainTextBody(body);

        Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }

    public static void sendEmailCreateAnimal(List<Animal__c> createAnimal, String templateDevName) {

        EmailTemplate emailTemplate = [Select Id, Subject, Body from EmailTemplate where DeveloperName =: templateDevName];

        String animalsSize = String.valueOf(createAnimal.size());

        String subject = emailTemplate.Subject;
        subject = subject.replace('{!animals.size}', animalsSize);

        String animalsName = '';
        for (Animal__c animal : createAnimal) {
            animalsName = animalsName +  '\n' + animal.Name;
        }

        String plainBody = emailTemplate.Body;
        plainBody = plainBody.replace('{!Today}', String.valueOf(Datetime.now()));
        plainBody = plainBody.replace('{!FirstName}', UserInfo.getUserName());
        plainBody = plainBody.replace('{!animals.size}', animalsSize);
        plainBody = plainBody.replace('{!animalsName}', animalsName);

        Messaging.Singleemailmessage email = new Messaging.Singleemailmessage();

        email.setToAddresses(new String[] {UserInfo.getUserEmail()});

        email.setSubject(subject);
        email.setPlainTextBody(plainBody);

        Messaging.sendEmail(new Messaging.SingleEmailmessage[] {email});

    }
    
}
