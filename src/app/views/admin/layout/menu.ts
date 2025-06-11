
interface menu{
    isTitle:boolean
    hasChildren:boolean
    title?:string
    name?:string
    route?:string
    children?: menu[]
}
export const AdminMenu:menu[]=[
    {
        isTitle:true,
        title:"MENU",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"Tableau de bord",
        route:'/admin/accueil',
        hasChildren:false
    
    },
    {
        isTitle:false,
        name:"Comptes utilisateurs",
        route:'/admin/parameters/users',
        hasChildren:false
    
    },
  
    {
        isTitle:false,
        name:"Réformes",
        route:'',
        hasChildren:true,
        children:[
            {
                isTitle:false,
                hasChildren:false,
                name:"Liste",
                route:"/admin/list-reformes"
            }
          
        ]
    
    },
    {
        isTitle:false,
        name:"Configurations",
        route:'',
        hasChildren:true,
        children:[
            {
                isTitle:false,
                hasChildren:false,
                name:"Secteurs",
                route:"/admin/parameters/sectors"
            },
            {
                isTitle:false,
                hasChildren:false,
                name:"Structures",
                route:"/admin/parameters/structures"
            },
            {
                isTitle:false,
                hasChildren:false,
                name:"Natures",
                route:"/admin/parameters/natures"
            },
            {
                isTitle:false,
                hasChildren:false,
                name:"Couvertures",
                route:"/admin/parameters/covers"
            },
            {
                isTitle:false,
                hasChildren:false,
                name:"Sauvegarde",
                route:"/admin/backups"
            }
          
        ]
    
    }
]


export const SaisieCentraleMenu:menu[]=[
    {
        isTitle:true,
        title:"MENU",
        hasChildren:false
    },
    {
        isTitle:false,
        name:"Tableau de bord",
        route:'/admin/accueil',
        hasChildren:false
    
    },
  
    {
        isTitle:false,
        name:"Réformes",
        route:'',
        hasChildren:true,
        children:[
            {
                isTitle:false,
                hasChildren:false,
                name:"Nouvelle",
                route:"/admin/create-reforme"
            },
            {
                isTitle:false,
                hasChildren:false,
                name:"Liste",
                route:"/admin/list-reformes"
            },
            // {
            //     isTitle:false,
            //     hasChildren:false,
            //     name:"Objectifs",
            //     route:"/admin/objectifs"
            // },
            {
                isTitle:false,
                hasChildren:false,
                name:"Suivi des réformes",
                route:"/admin/follow-reformes"
            }
          
        ]
    
    },
    {
        isTitle:false,
        name:"Configurations",
        route:'',
        hasChildren:true,
        children:[
            {
                isTitle:false,
                hasChildren:false,
                name:"Secteurs",
                route:"/admin/parameters/sectors"
            },
            {
                isTitle:false,
                hasChildren:false,
                name:"Structures",
                route:"/admin/parameters/structures"
            },
            {
                isTitle:false,
                hasChildren:false,
                name:"Natures",
                route:"/admin/parameters/natures"
            },
            {
                isTitle:false,
                hasChildren:false,
                name:"Couvertures",
                route:"/admin/parameters/covers"
            }
          
        ]
    
    }
   
    ]
    export const SaisieMenu:menu[]=[
        {
            isTitle:true,
            title:"MENU",
            hasChildren:false
        },
        {
            isTitle:false,
            name:"Tableau de bord",
            route:'/admin/accueil',
            hasChildren:false
        
        },
      
        {
            isTitle:false,
            name:"Réformes",
            route:'',
            hasChildren:true,
            children:[
                {
                    isTitle:false,
                    hasChildren:false,
                    name:"Nouvelle",
                    route:"/admin/create-reforme"
                },
                {
                    isTitle:false,
                    hasChildren:false,
                    name:"A transmettre",
                    route:"/admin/treatment-reformes"
                },
                {
                    isTitle:false,
                    hasChildren:false,
                    name:"Mes enregistrements",
                    route:"/admin/mylist-reformes"
                },
                // {
                //     isTitle:false,
                //     hasChildren:false,
                //     name:"Objectifs",
                //     route:"/admin/objectifs"
                // },
                
                {
                    isTitle:false,
                    hasChildren:false,
                    name:"Données de suivi",
                    route:"/admin/follow-reforme-create"
                },
                {
                    isTitle:false,
                    hasChildren:false,
                    name:"Suivi des réformes",
                    route:"/admin/follow-reformes"
                }
              
            ]
        
        }
       
        ]
        export const ValidationMenu:menu[]=[
            {
                isTitle:true,
                title:"MENU",
                hasChildren:false
            },
            {
                isTitle:false,
                name:"Tableau de bord",
                route:'/admin/accueil',
                hasChildren:false
            
            },
          
            {
                isTitle:false,
                name:"Réformes",
                route:'',
                hasChildren:true,
                children:[
                    {
                        isTitle:false,
                        hasChildren:false,
                        name:"Nouvelle",
                        route:"/admin/create-reforme"
                    },
                    {
                        isTitle:false,
                        hasChildren:false,
                        name:"A valider",
                        route:"/admin/treatment-reformes"
                    },
                    {
                        isTitle:false,
                        hasChildren:false,
                        name:"Mes enregistrements",
                        route:"/admin/mylist-reformes"
                    },
                    // {
                    //     isTitle:false,
                    //     hasChildren:false,
                    //     name:"Objectifs",
                    //     route:"/admin/objectifs"
                    // },
                    {
                        isTitle:false,
                        hasChildren:false,
                        name:"Suivi des réformes",
                        route:"/admin/follow-reformes"
                    }
                  
                ]
            
            }
           
            ]
            export const PublicationMenu:menu[]=[
                {
                    isTitle:true,
                    title:"MENU",
                    hasChildren:false
                },
                {
                    isTitle:false,
                    name:"Tableau de bord",
                    route:'/admin/accueil',
                    hasChildren:false
                
                },
              
                {
                    isTitle:false,
                    name:"Réformes",
                    route:'',
                    hasChildren:true,
                    children:[
                        {
                            isTitle:false,
                            hasChildren:false,
                            name:"Nouvelle",
                            route:"/admin/create-reforme"
                        },
                        {
                            isTitle:false,
                            hasChildren:false,
                            name:"A publier",
                            route:"/admin/treatment-reformes"
                        },
                        {
                            isTitle:false,
                            hasChildren:false,
                            name:"Mes enregistrements",
                            route:"/admin/mylist-reformes"
                        },
                        {
                            isTitle:false,
                            hasChildren:false,
                            name:"Liste",
                            route:"/admin/list-reformes"
                        },
                        // {
                        //     isTitle:false,
                        //     hasChildren:false,
                        //     name:"Objectifs",
                        //     route:"/admin/objectifs"
                        // },
                        {
                            isTitle:false,
                            hasChildren:false,
                            name:"Suivi des réformes",
                            route:"/admin/follow-reformes"
                        }
                      
                    ]
                
                }
               
                ]
    