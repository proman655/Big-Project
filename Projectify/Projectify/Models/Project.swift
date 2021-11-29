//
//  Project.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/27/21.
//

import Foundation

public class Project: Codable {
    var _id:String
    var title:String
    var content:String
    var category:String
    var user:String
    var dueDate:String
    var favorite:Bool
}

