public class Animal {
    
    public AnimalInfo animal;
	public String[] animals;
    
    public class AnimalInfo {
        
        public String eats;
    	public String says;
    	public String id;
    	public String name;
        
        public AnimalInfo(String id, String name, String says, String eats) {
            this.id = id;
            this.name = name;
            this.says = says;
            this.eats = eats;
        }
          
    }
      
    @future(callout=true)
    public static void updateAnimalsInfo(Set<Id> animalsIds) {
    	
        List<Animal__c> animals = [SELECT Name, Eats__c, Says__c, ID__c FROM Animal__c WHERE Id IN :animalsIds AND ID__c != null];
        List<Animal__c> animalsUpdate = new List<Animal__c>();
        
        AnimalInfo animalInfo;      
        
        for (Animal__c animalObj : animals) {
            
        	animalInfo = getAnimalById((Integer) animalObj.ID__c);
            animalsUpdate.add(animalObj); 
    
        }      
            Database.update(animalsUpdate);  
    }
    

    public static AnimalInfo getAnimalById(Integer Id) {
        
        Http http = new Http();
        
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/' + Id);
        request.setMethod('GET');        
        HttpResponse response = http.send(request);        
        AnimalInfo animalInfo;
         
        if (response.getStatusCode() == 200) {
            Animal webAnimal = (Animal) JSON.deserialize(response.getBody(), Animal.class);
            animalInfo = webAnimal.animal;
        }
        return animalInfo;       
    }
    
    
    public static void createAnimalById(Integer Id) {
    	
    	AnimalInfo animalInfo = getAnimalById(Id);
        if (animalInfo != null || animalInfo.id != '0') {
            
            String nameNewAnimal = 'new Animal';
            
            if (animalInfo.name != null || String.isBlank(animalInfo.name) || String.isEmpty(animalInfo.name)) {
                nameNewAnimal = animalInfo.name;
            }
            
            Animal__c newAnimal = new Animal__c(Name = nameNewAnimal, ID__c = Id);         
        }     
    }  

    @AuraEnabled(cacheable=true)
    public static List<Animal__c> getAnimalRangeById(String minId, String maxId){
        
        Integer min = Integer.valueOf(minId);
        Integer max = Integer.valueOf(maxId);

        List<Animal__c> animalList = new List<Animal__c>();

        for (Integer Id = min; Id < max+1; Id++) {
            AnimalInfo animalid = getAnimalById(Id);
            if ( animalid.id != '0' ) {
            Animal__c animal = new Animal__c(Name = animalid.name, id__c = (Decimal) Id, eats__c = animalid.eats, says__c = animalid.says);
            animalList.add(animal);
            }          
        }
        return animalList;
    }

    @AuraEnabled
    public static void createAnimals(List<Animal__c> Animals){
        insert Animals;
	EmailAnimalResult.sendEmailCreateAnimal(animals, 'Create_Animal');
    }
 
}
