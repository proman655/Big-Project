//
//  User.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/25/21.
//

import Foundation

public class User: Codable {
    var name:String
    var email:String
    var _id:String
    var token:String
    var pic:String
    var isAdmin:Bool    
}

