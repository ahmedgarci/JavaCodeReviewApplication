package com.example.worker.Services.maven;

import java.nio.file.Path;


import org.springframework.stereotype.Service;

@Service
public class MavenCompiler {

   public void compile(Path projectPath) throws Exception {

    Path absolutePath = projectPath.toAbsolutePath().normalize();

    Path maven = Path.of(
        "C:\\apache-maven-3.9.11\\bin\\mvn.cmd"
    );


    ProcessBuilder processBuilder = new ProcessBuilder(
        "cmd.exe",
        "/c",
        maven.toString(),
        "clean",
        "compile"
    );

    processBuilder.directory(absolutePath.toFile());

    processBuilder.inheritIO();

    Process process = processBuilder.start();

    int exitCode = process.waitFor();

    System.out.println("Maven exit code = " + exitCode);

    if (exitCode != 0) {
        throw new RuntimeException(
            "Maven compilation failed with exit code: " + exitCode
        );
    }
}


}